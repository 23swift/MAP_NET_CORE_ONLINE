import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { OwnersFormModalService } from './owners-form-modal.service';

@Component({
  selector: 'app-owners-form-modal',
  templateUrl: './owners-form-modal.component.html',
  styleUrls: ['./owners-form-modal.component.css'],
  providers: [OwnersFormModalService]
})
export class OwnersFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: Object;

  constructor(private _modalRef: MatDialogRef<OwnersFormModalComponent>, private _ownersService: OwnersFormModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) {
      if (data['owner']) {
        this.model = Object.assign({}, data['owner']);
      } else {
        this.model = {
          customerProfileId: this.data['customerProfileId']
        };
      }
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._ownersService.getFormlyFields();
  }

  submit() {
    if (this.model['id']) {
      this._ownersService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('Owner\'s Details', 'Updated', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    } else {
      this._ownersService.create(this.model).subscribe(data => {
        this._snackBar.open('Owner\'s Details', 'Saved', {
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
