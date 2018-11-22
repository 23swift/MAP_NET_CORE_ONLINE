import { Component, OnInit, Inject } from '@angular/core';
import { BranchFormModalService } from './branch-form-modal.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-branch-form-modal',
  templateUrl: './branch-form-modal.component.html',
  styleUrls: ['./branch-form-modal.component.css'],
  providers: [BranchFormModalService]
})
export class BranchFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: Object;

  constructor(private _modalRef: MatDialogRef<BranchFormModalComponent>, private _branchService: BranchFormModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
      if (data['branch']) {
        this.model = Object.assign({}, data['branch']);
      } else {
        this.model = {
          newAffiliationId: this.data['newAffiliationId']
        };
      }
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._branchService.getBranchFields();
  }

  submit() {
    if (this.model['id']) {
      this._branchService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('Branch Details', 'Updated', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    } else {
      this._branchService.create(this.model).subscribe(data => {
        this._snackBar.open('Branch Details', 'Saved', {
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
