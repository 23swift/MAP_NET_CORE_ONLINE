import { Component, OnInit, Input, Renderer2, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MidService } from './mid.service';
import { MatDialog } from '@angular/material';
import { MidFormModalComponent } from '../modal/mid-form-modal/mid-form-modal.component';
import { MidModalComponent } from '../modal/mid-modal/mid-modal.component';
import { FormControl, FormGroup } from '../../../node_modules/@angular/forms';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { forkJoin } from 'rxjs';
import { MidListModalService } from '../modal/mid-list-modal/mid-list-modal.service';
import { DropDownService } from '../services/drop-down.service';

@Component({
  selector: 'app-mid',
  templateUrl: './mid.component.html',
  styleUrls: ['./mid.component.css'],
  providers: [MidService]
})
export class MidComponent implements OnInit {
  @ViewChildren('midInput') midInputRef: QueryList<ElementRef>;
  // private midInputRef: ElementRef;
  displayedColumns: string[];
  mode: string;
  dataSource: Object[];
  form: FormGroup;
  midIndex: number; // ROW WHERE ADDING OR UPDATE OF MID IS CLICKED
  midContainer: number[]; // CONTAINER OF ALL MIDs
  midInput: FormControl; // FORM CONTROL FOR MID INPUTTED
  tidIndex: number; // ROW WHERE ADDING OR UPDATE OF TID IS CLICKED
  tidContainer: string[]; // CONTAINER OF ALL TIDs
  tidInput: FormControl; // FORM CONTROL FOR TID INPUTTED
  showAction: boolean;
  @Input() showAdd = true;
  @Input() showUpdate = true;
  @Input() branchId;

  monitorCodeList = [];
  cardPlansList = [];

  constructor(private _midService: MidListModalService,
    private _dialog: MatDialog,
    private _changeDetectRef: ChangeDetectorRef,
    private _dropDownService: DropDownService) {

    forkJoin([
      // this._midService.getByBranchId(this.branchId),
      this._dropDownService.getDropdown('MC'),
      this._dropDownService.getDropdown('CP')
    ]).subscribe(fjData => {
      // this.dataSource = fjData[0].items;
      this.monitorCodeList = fjData[0];
      this.cardPlansList = fjData[1];
    });
  }

  ngOnInit() {
    this.dataSource = [];
    this.form = new FormGroup({});
    this.midContainer = new Array<number>(this.dataSource.length);
    this.tidContainer = new Array<string>(this.dataSource.length);
    this.displayedColumns = this._midService.getTableFields('');
    this.midInput = new FormControl('');
    this.tidInput = new FormControl('');

    this._midService.getByBranchId(this.branchId).subscribe(d => {
      this.dataSource = d.items;
    });
  }

  private refresh() {
    this._midService.getByBranchId(this.branchId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  addMid() {
    const dialog = this._dialog.open(MidFormModalComponent, {
      width: '80%',
      height: 'auto',
      data: {
        branchId: this.branchId
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  updateMidDetails(mid) {
    const dialog = this._dialog.open(MidFormModalComponent, {
      width: '80%',
      height: 'auto',
      data: {
        mid: mid
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  showMidUpdateButton(index) {
    this.midIndex = index;
    if (this.midContainer[index] !== undefined) {
      this.midInput.setValue(this.midContainer[index]);
    } else {
      this.midInput.setValue(undefined);
    }
  }

  saveMid(element, index) {
    const value = element.value;
    if (value.match(/^\d{10}$|^$/)) {
      if (value === '') {
        this.midContainer.splice(index, 1);
      } else {
        this.midContainer.splice(index, 1, +value);
      }
      this.midIndex = undefined;
    } else {
      console.log('Invalid MIDs Inputted!');
    }
  }

  cancel() {
    this.midIndex = undefined;
    this.tidIndex = undefined;
  }

  showTidUpdateButton(index) {
    this.tidIndex = index;

    if (this.tidContainer[index] !== undefined) {
      this.tidInput.setValue(this.tidContainer[index]);
    } else {
      this.tidInput.setValue(undefined);
    }
  }

  saveTid(element, index) {
    const value = element.value;
    if (value.match(/^\d{10}(,\d{10})*$/)) {
      if (value === '') {
        this.tidContainer.splice(index, 1);
      } else {
        this.tidContainer.splice(index, 1, value);
      }
      this.tidIndex = undefined;
    } else {
      console.log('Invalid TIDs Inputted!');
    }
  }

  delete(id) {
    const dialog = this._dialog.open(DeleteModalComponent, {
      width: '60%',
      data: {
        delete: this._midService.delete(id)
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  getMonitorCode(mc) {
    return this.monitorCodeList.find(m => m.code === mc).value;
  }

  getCardPlans(cp) {
    return this.cardPlansList.find(m => m.code === cp).value;
  }

  getStatus(s) {
    return this._midService.getStatus().find(m => m.value === s).label;
  }
}
