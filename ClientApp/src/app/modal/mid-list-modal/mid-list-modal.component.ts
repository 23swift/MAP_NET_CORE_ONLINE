import { Component, OnInit, Input, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, Inject } from '@angular/core';
import { MidListModalService } from './mid-list-modal.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { MidFormModalComponent } from '../mid-form-modal/mid-form-modal.component';

@Component({
  selector: 'app-mid-list-modal',
  templateUrl: './mid-list-modal.component.html',
  styleUrls: ['./mid-list-modal.component.css']
})
export class MidListModalComponent implements OnInit {
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
  @Input() branchId = 0;
  constructor(private _midService: MidListModalService,
    private _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private _changeDetectRef: ChangeDetectorRef) {
    this._midService.getByBranchId(this.modalData['branchId']).subscribe(midList => {
      this.dataSource = midList.items;
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
  }

  private refresh() {
    this._midService.getByBranchId(this.modalData['branchId']).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  addMid() {
    const dialog = this._dialog.open(MidFormModalComponent, {
      width: '80%',
      height: 'auto',
      data: {
        branchId: this.modalData['branchId']
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
    if (confirm('Are you sure?')) {
      this._midService.delete(id).subscribe(data => {
        this.refresh();
      });
    }
  }

  getMonitorCode(mc) {
    return this._midService.getMonitorCode().find(m => m.value === mc).label;
  }

  getCardPlans(cp) {
    return this._midService.getCardPlans().find(m => m.value === cp).label;
  }

  getStatus(s) {
    return this._midService.getStatus().find(m => m.value === s).label;
  }
}
