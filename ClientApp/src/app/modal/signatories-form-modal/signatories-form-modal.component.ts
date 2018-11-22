import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { FormlyFieldConfig } from '../../../../node_modules/@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SignatoriesFormModalService } from './signatories-form-modal.service';
import { CustomerProfileService } from 'src/app/customer-profile/customer-profile.service';

@Component({
  selector: 'app-signatories-form-modal',
  templateUrl: './signatories-form-modal.component.html',
  styleUrls: ['./signatories-form-modal.component.css'],
  providers: [SignatoriesFormModalService, CustomerProfileService]
})
export class SignatoriesFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options = {};

  constructor(private _modalRef: MatDialogRef<SignatoriesFormModalComponent>, private _signatoriesService: SignatoriesFormModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _customerProfileService: CustomerProfileService) {
    if (data['signatory']) {
      this.model = Object.assign({}, data['signatory']);
    } else {
      this.model = {
        customerProfileId: this.data['customerProfileId']
      };
    }

    if (this.model['customerProfileId']) {
      this._customerProfileService.get(this.model['customerProfileId']).subscribe(cpData => {
        if (cpData['ownership'] === 9) {
          this.model['name'] = cpData['legalName'];
          this.model['signingAuthority'] = 'Singly';
          this.model['position'] = 'Proprietor';
        }
        this.fields = this._signatoriesService.getFormlyFields();
      });
    } else {
      this.fields = this._signatoriesService.getFormlyFields();
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._signatoriesService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('Signatory\'s Details', 'Updated', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    } else {
      if (this.model['customerProfileId']) {
        this._signatoriesService.create(this.model).subscribe(data => {
          this._snackBar.open('Signatory\'s Details', 'Saved', {
            duration: 1500
          });
          this._modalRef.close(data);
        });
      } else {
        this._snackBar.open('Signatory\'s Details', 'Customer Profile Must Be Saved First', {
          duration: 2000
        });
        this._modalRef.close();
      }
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
