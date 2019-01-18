import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ApproveWithExceptReasonMqrDetailsModalService } from './approve-with-except-reason-mqr-details-modal.service';

@Component({
  selector: 'app-approve-with-except-reason-mqr-details-modal',
  templateUrl: './approve-with-except-reason-mqr-details-modal.component.html',
  styleUrls: ['./approve-with-except-reason-mqr-details-modal.component.css'],
  providers: [ApproveWithExceptReasonMqrDetailsModalService]
})
export class ApproveWithExceptReasonMqrDetailsModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
  };

  constructor(private _modalRef: MatDialogRef<ApproveWithExceptReasonMqrDetailsModalComponent>,
    private _service: ApproveWithExceptReasonMqrDetailsModalService, @Inject(MAT_DIALOG_DATA)
    public data: any, private _snackBar: MatSnackBar)
  { 
    if (this.data.appex) {
      this.model = this.data.appex;
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
    if (this.model['id']) {
      this._service.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Approve With Exception Reason Details', 'Updated', {
          duration: 1000
        });
        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close(data);
        });
      });
    }
    else {
      this._service.create(this.model).subscribe(data => {
        this._snackBar.open('Approve With Exception Reason Details', 'Saved', {
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
