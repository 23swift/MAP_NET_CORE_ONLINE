import { Component, OnInit, Input, Renderer2, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MidService } from './mid.service';
import { MatDialog, MatSnackBar } from '@angular/material';
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
  midContainer: string[]; // CONTAINER OF ALL MIDs
  midInput: FormControl; // FORM CONTROL FOR MID INPUTTED
  tidIndex: number; // ROW WHERE ADDING OR UPDATE OF TID IS CLICKED
  tidContainer: string[]; // CONTAINER OF ALL TIDs
  tidInput: FormControl; // FORM CONTROL FOR TID INPUTTED
  showAction: boolean;
  @Input() showAdd = true;
  @Input() showUpdate = true;
  @Input() branchId;
  @Input() showDelete: boolean;
  @Input() update: boolean;

  monitorCodeList = [];
  cardPlansList = [];

  constructor(private _midService: MidListModalService,
    private _dialog: MatDialog,
    private _changeDetectRef: ChangeDetectorRef,
    private _dropDownService: DropDownService,
    private _matSnackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.displayedColumns = ['Currency', 'MonitorCode', 'CardPlans', 'Status', 'Mid', 'DebitTid', 'Action'];
    this.midInput = new FormControl('');
    this.tidInput = new FormControl('');


    forkJoin([
      this._midService.getByBranchId(this.branchId),
      this._dropDownService.getDropdown('MC'),
      this._dropDownService.getDropdown('CP')
    ]).subscribe(fjData => {
      this.dataSource = fjData[0].items;
      this.monitorCodeList = fjData[1];
      this.cardPlansList = fjData[2];
      this.getDropdownValues(this.dataSource);
      this.midContainer = new Array<string>(this.dataSource.length);
      this.tidContainer = new Array<string>(this.dataSource.length);
    });


  }

  private refresh() {
    this._midService.getByBranchId(this.branchId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
      this.getDropdownValues(this.dataSource);
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

  showMidUpdateButton(mid, index) {
    this.midIndex = index;
    if (this.midContainer[index] !== undefined) {
      this.midInput.setValue(mid);
    } else {
      this.midInput.setValue('');
    }
  }

  saveMid(element, id,index) {
    const value = element.value;
    if (value !== '') {
      if (value.match(/^\d{10}$|^$/)) {
        this._midService.saveMid(value, id).subscribe(x => {
          this._matSnackbar.open(value, 'Inputted!', {
            duration: 1000
          })
          this.midIndex = undefined;
          this.refresh();
        });
        
      }
      else {
        this._matSnackbar.open('Invalid MID"s Inputted!', value, {
          duration: 1000
        });
      }
    }
  }

  cancel() {
    this.midIndex = undefined;
    this.tidIndex = undefined;
  }

  showTidUpdateButton(tid, index) {
    this.tidIndex = index;

    if (this.tidContainer[index] !== undefined) {
      this.tidInput.setValue(tid);
    } else {
      this.tidInput.setValue('');
    }
  }

  saveTid(element, id, index) {
    const value = element.value;
    if (value !== '') {
      if (value.match(/^\d{1,10}(,\d{1,10})*$/)) {
        this._midService.saveTid(value, id).subscribe(x => { 
          this._matSnackbar.open(value, 'Inputted!', {
            duration: 1000
          })
          this.refresh();
          this.tidIndex = undefined;
        });
      }
      else {
        console.log('Invalid TID"s Inputted!');
      }
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

  getDropdownValues(list: Object[]) {
    list.forEach(item => {
      item['monitorCode'] = this.monitorCodeList.find(n => n.code === item['monitorCode']).value;
      item['cardPlans'] = this.cardPlansList.find(n => n.code === item['cardPlans']).value;
      item['status'] = this._midService.getStatus().find(n => n.code === item['status']).value;
    });
  }
}
