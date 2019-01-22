import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ApproveWithReqReasonMqrFormModalService } from './approve-with-req-reason-mqr-form-modal.service';

@Component({
  selector: 'app-approve-with-req-reason-mqr-form-modal',
  templateUrl: './approve-with-req-reason-mqr-form-modal.component.html',
  styleUrls: ['./approve-with-req-reason-mqr-form-modal.component.css'],
  providers: [ApproveWithReqReasonMqrFormModalService]
})
export class ApproveWithReqReasonMqrFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
  };

  constructor(private _modalRef: MatDialogRef<ApproveWithReqReasonMqrFormModalComponent>,
    private _service: ApproveWithReqReasonMqrFormModalService, @Inject(MAT_DIALOG_DATA)
    public data: any, private _snackBar: MatSnackBar)
  { 
    if (this.data.appreq) {
      this.model = this.data.appreq;
    }
    else {
      this.model = { MAEFId: this.data['maefId'] };
    }
 
    this.getFields();
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    console.log(this.model);
    if (this.model['id']) {
      this._service.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Approve With Requirement Reason', 'Updated', {
          duration: 1500
        });
        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close(data);
        });
      });
    }
    else {
      this._service.create(this.model).subscribe(data => {
        this._snackBar.open('Approve With Requirement Reason', 'Saved', {
          duration: 1500
        });
        this._modalRef.close(data);
      }, err => { 
        const snackBarRef = this._snackBar.open('MAEF', 'No Inputted Value!', {
          duration: 1500
        });
        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close(err);
        });
      });
    }

  }

  public getFields() {
    this.fields = this._service.getFormlyFields();
  }

  cancel() {
    this._modalRef.close();
  }

}
