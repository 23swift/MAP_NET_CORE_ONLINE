import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { FormlyFieldConfig } from '../../../../node_modules/@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SignatoriesFormModalService } from './signatories-form-modal.service';

@Component({
  selector: 'app-signatories-form-modal',
  templateUrl: './signatories-form-modal.component.html',
  styleUrls: ['./signatories-form-modal.component.css'],
  providers: [SignatoriesFormModalService]
})
export class SignatoriesFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options = {};
  
  constructor(private _modalRef: MatDialogRef<SignatoriesFormModalComponent>, private _service: SignatoriesFormModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
    if (data['signatory']) {
      this.model = Object.assign({}, data['signatory']);
    } else {
      this.model = {
        customerProfileId: this.data['customerProfileId']
      };
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._service.getFormlyFields();
  }

  submit() {
    if (this.model['id']) {
      this._service.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('Signatory\'s Details', 'Updated', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    } else {
      this._service.create(this.model).subscribe(data => {
        this._snackBar.open('Signatory\'s Details', 'Saved', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
