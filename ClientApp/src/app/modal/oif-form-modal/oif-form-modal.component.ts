import { Component, OnInit, Inject, Input } from '@angular/core';
import { OifFormModalService } from './oif-form-modal.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { BranchListService } from 'src/app/branch-list/branch-list.service';
import { MidListModalService } from '../mid-list-modal/mid-list-modal.service';

@Component({
  selector: 'app-oif-form-modal',
  templateUrl: './oif-form-modal.component.html',
  styleUrls: ['./oif-form-modal.component.css'],
  providers: [OifFormModalService]
})
export class OifFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };
  displayMode = false;

  constructor(private _oifService: OifFormModalService,
    private _modalRef: MatDialogRef<OifFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, private _snackBar: MatSnackBar,
    private _midListModalService: MidListModalService) {

    forkJoin([
      this._oifService.getByBranch(this.dialogData['branchId']),
      this._oifService.getOifAutoPopulate(this.dialogData['branchId']),
      this._midListModalService.getExistingMonitorCodes(this.dialogData['branchId'])
    ]).subscribe(fjData => {
      if (fjData[0]) {
        this.model = fjData[0];
        this.model['monitorCodeList'] = fjData[2];
      } else {
        this.model = fjData[1];
        this.model['monitorCodeList'] = fjData[2];
        this.model['branchId'] = this.dialogData['branchId'];
      }
      this.fields = this._oifService.getOIFFields();
    });
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
     // console.log(this.model);
      this._oifService.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('OIF Details', 'Updated', {
          duration: 1500
        });

        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close();
        });        
      }, err => {
        const snackBarRef = this._snackBar.open('OIF Details', 'Updated', {
          duration: 1500
        });
        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close();
        });     
      });
    } else {
      this._oifService.create(this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('OIF Details', 'Saved', {
          duration: 1500
        });
        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close();
        });     
      }, err => {
        const snackBarRef = this._snackBar.open('OIF Details', 'Updated', {
          duration: 1500
        });
        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close();
        });     
      });
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
