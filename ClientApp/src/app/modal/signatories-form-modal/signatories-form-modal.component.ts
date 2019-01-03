import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '../../../../node_modules/@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '../../../../node_modules/@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SignatoriesFormModalService } from './signatories-form-modal.service';
import { CustomerProfileService } from 'src/app/customer-profile/customer-profile.service';
import { forkJoin } from 'rxjs';
import { DropDownService } from 'src/app/services/drop-down.service';

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
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };

  constructor(private _modalRef: MatDialogRef<SignatoriesFormModalComponent>, private _signatoriesService: SignatoriesFormModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _customerProfileService: CustomerProfileService,
    private _dropDown: DropDownService) {
    if (data['signatory']) {
      this.model = Object.assign({}, data['signatory']);
    } else {
      this.model = {
        customerProfileId: this.data['customerProfileId']
      };
    }

    if (this.model['customerProfileId']) {
      forkJoin([
        this._customerProfileService.get(this.model['customerProfileId']),
        this._dropDown.getDropdown('OW')
      ]).subscribe(fjData => {
        const singleAndForeign = fjData[1].find(w => w['code'] === 'FISP');
        const single = fjData[1].find(w => w['code'] === 'SP');
        
        if (fjData[0]['ownership'] === singleAndForeign['code'] || fjData[0]['ownership'] === single['code']) {
          this.model['name'] = fjData[0]['legalName'];
          this.model['signingAuthority'] = 'Singly';
          this.model['position'] = 'Proprietor';
        }
        this.fields = this._signatoriesService.getFormlyFields(this.data['userGroup']);
      });
    } else {
      this.fields = this._signatoriesService.getFormlyFields(this.data['userGroup']);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._signatoriesService.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Signatory\'s Details', 'Updated', {
          duration: 1000
        });

        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close(data);
        });
      });
    } else {
      if (this.model['name'] || this.model['signingAuthority'] || this.model['position']) {
        this._signatoriesService.create(this.model).subscribe(data => {
          const snackBarRef = this._snackBar.open('Signatory\'s Details', 'Saved', {
            duration: 1000
          });

          snackBarRef.afterDismissed().subscribe(s => {
            this._modalRef.close(data);
          });
        });
      } else {
        const snackBarRef = this._snackBar.open('Signatory\'s Details', 'No Inputted Value', {
          duration: 1000
        });

        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close();
        });
      }
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
