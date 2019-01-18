import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

import { OwnersFormModalService } from './owners-form-modal.service';
import { CustomerProfileService } from 'src/app/customer-profile/customer-profile.service';
import { DropDownService } from 'src/app/services/drop-down.service';
import { forkJoin } from 'rxjs';

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
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };
  userGroup: string;

  constructor(private _modalRef: MatDialogRef<OwnersFormModalComponent>, private _ownersService: OwnersFormModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private _customerProfileService: CustomerProfileService,
    private _dropDown: DropDownService) {
    if (data['owner']) {
      this.model = Object.assign({}, data['owner']);
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
          this.model['percentOfOwnership'] = 100;
        }

        this.fields = this._ownersService.getFormlyFields(this.data['userGroup']);
      });
    } else {
      this.fields = this._ownersService.getFormlyFields(this.data['userGroup']);
    }
    
    this.userGroup = this.data['userGroup'];
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._ownersService.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Owner\'s Details', 'Updated', {
          duration: 1000
        });

        snackBarRef.afterDismissed().subscribe(s => {
          this._modalRef.close(data);
        });
      });
    } else {
      if (this.model['name'] || this.model['percentOfOwnership'] || this.model['remarks']) {
        this._ownersService.create(this.model).subscribe(data => {
          const snackBarRef = this._snackBar.open('Owner\'s Details', 'Saved', {
            duration: 1000
          });

          snackBarRef.afterDismissed().subscribe(s => {
            this._modalRef.close(data);
          });
        });
      }  else {
        const snackBarRef = this._snackBar.open('Owner\'s Details', 'No Inputted Value', {
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
