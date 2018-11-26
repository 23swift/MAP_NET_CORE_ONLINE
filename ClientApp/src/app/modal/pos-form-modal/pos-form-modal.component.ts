import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { PosFormModalService } from './pos-form-modal.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pos-form-modal',
  templateUrl: './pos-form-modal.component.html',
  styleUrls: ['./pos-form-modal.component.css'],
  providers: [PosFormModalService]
})
export class PosFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  userGroup: string;
  model: Object;
  branchId: number;
  options = {};

  constructor(private _posService: PosFormModalService, private _modalRef: MatDialogRef<PosFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public _dialogData: any,
    private _snackBar: MatSnackBar) {
    this.model = {};
    this.model['id'] = 0;
    this.fields = this._posService.getPosFields('ao');
    if (!this._dialogData['pos']) {
      this.branchId = this._dialogData['branchId']; // FOR MID LIST IN MODAL
      this.model = {
        branchId: this._dialogData['branchId']
      };
    } else {
      this.model = Object.assign({}, this._dialogData['pos']);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._posService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('POS Details', 'Updated', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    } else {
      this._posService.create(this.model).subscribe(data => {
        this._snackBar.open('POS Details', 'Saved', {
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
