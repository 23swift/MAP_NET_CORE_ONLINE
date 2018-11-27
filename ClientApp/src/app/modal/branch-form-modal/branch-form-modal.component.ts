import { Component, OnInit, Inject } from '@angular/core';
import { BranchFormModalService } from './branch-form-modal.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CustomerProfileService } from 'src/app/customer-profile/customer-profile.service';

@Component({
  selector: 'app-branch-form-modal',
  templateUrl: './branch-form-modal.component.html',
  styleUrls: ['./branch-form-modal.component.css'],
  providers: [BranchFormModalService, CustomerProfileService]
})
export class BranchFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };

  constructor(private _modalRef: MatDialogRef<BranchFormModalComponent>, private _branchService: BranchFormModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar, private _customerProfileService: CustomerProfileService) {
    this.model = {};
    this.model['id'] = 0;
    if (this.data['newAffiliationId']) {
      this._customerProfileService.get(this.data['newAffiliationId']).subscribe(cpData => {
        this.model = data;
        console.log(data);
        this.model['registeredBusinessNo'] = cpData['registeredBusinessNumber'];

        this.fields = this._branchService.getBranchFields();
      });
    } else {
      this.model = data['branch'];
      this.fields = this._branchService.getBranchFields();
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._branchService.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Branch Details', 'Updated', {
          duration: 1000
        });
        snackBarRef.afterDismissed().subscribe(x => {
          this._modalRef.close(data);
        });
      });
    } else {
      this._branchService.create(this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Branch Details', 'Saved', {
          duration: 1000
        });
        snackBarRef.afterDismissed().subscribe(x => {
          this._modalRef.close(data);
        });
      });
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
