import { Component, OnInit, Inject } from '@angular/core';
import { OifFormModalService } from './oif-form-modal.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

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
  options = {};
  displayMode = false;

  constructor(private _oifService: OifFormModalService,
    private _modalRef: MatDialogRef<OifFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
    this.fields = this._oifService.getOIFFields();
    this._oifService.getByBranch(this.data['branchId']).subscribe(oifData => {
      this.model = oifData || {
        branchId: this.data['branchId']
      };
    });
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._oifService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('OIF Details', 'Updated', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    } else {
      this._oifService.create(this.model).subscribe(data => {
        this._snackBar.open('OIF Details', 'Saved', {
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
