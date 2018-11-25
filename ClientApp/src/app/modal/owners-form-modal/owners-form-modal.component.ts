import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { OwnersFormModalService } from './owners-form-modal.service';
import { CustomerProfileService } from 'src/app/customer-profile/customer-profile.service';

@Component({
  selector: 'app-owners-form-modal',
  templateUrl: './owners-form-modal.component.html',
  styleUrls: ['./owners-form-modal.component.css'],
  providers: [OwnersFormModalService, CustomerProfileService]
})
export class OwnersFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: Object;

  constructor(private _modalRef: MatDialogRef<OwnersFormModalComponent>, private _ownersService: OwnersFormModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _customerProfileService: CustomerProfileService) {
    if (data['owner']) {
      this.model = Object.assign({}, data['owner']);
    } else {
      this.model = {
        customerProfileId: this.data['customerProfileId']
      };
    }

    if (this.model['customerProfileId']) {
      this._customerProfileService.get(this.model['customerProfileId']).subscribe(cpData => {
        if (cpData['ownership'] === 9) {
          this.model['name'] = cpData['legalName'];
          this.model['percentOfOwnership'] = 100;
        }
        this.fields = this._ownersService.getFormlyFields();
      });
    } else {
      this.fields = this._ownersService.getFormlyFields();
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._ownersService.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Owner\'s Details', 'Updated', {
          duration: 1500
        });

        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close(data);
        });
      });
    } else {
      if (this.model['name'] || this.model['percentOfOwnership'] || this.model['remarks']) {
        this._ownersService.create(this.model).subscribe(data => {
          const snackBarRef = this._snackBar.open('Owner\'s Details', 'Saved', {
            duration: 1500
          });

          snackBarRef.afterDismissed().subscribe(s => {
            this._modalRef.close(data);
          });
        });
      }  else {
        const snackBarRef = this._snackBar.open('Owner\'s Details', 'No Inputted Value', {
          duration: 1500
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
