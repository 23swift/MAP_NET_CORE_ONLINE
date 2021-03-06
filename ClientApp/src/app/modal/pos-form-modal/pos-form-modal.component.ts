import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, throwToolbarMixedModesError } from '@angular/material';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

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
  displayMode: boolean;
  showMid = true;
  showTerminalUpdate = true;
  showTerminalAdd = true;
  showTerminalDelete = true;
  showPrint = false;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };

  constructor(private _posService: PosFormModalService,
    private _modalRef: MatDialogRef<PosFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public _dialogData: any,
    private _snackBar: MatSnackBar) {
    this.userGroup = this._dialogData['userGroup'];
    if (this._dialogData['showMid'] !== undefined) {
      this.showMid = this._dialogData['showMid'];
    }
    if (this._dialogData['showTerminalUpdate'] !== undefined) {
      this.showTerminalUpdate = this._dialogData['showTerminalUpdate'];
    }
    if (this._dialogData['showTerminalAdd'] !== undefined) {
      this.showTerminalAdd = this._dialogData['showTerminalAdd'];
    }
    if (this._dialogData['showTerminalDelete'] !== undefined) {
      this.showTerminalDelete = this._dialogData['showTerminalDelete'];
    }
    if (this._dialogData['showPrint'] !== undefined) {
      this.showPrint = this._dialogData['showPrint'];
    }
    this.displayMode = this._dialogData['displayMode'];
    this.model = {};
    this.model['id'] = 0;

    if (!this._dialogData['pos']) {
      this.branchId = this._dialogData['branchId']; // FOR MID LIST IN MODAL

      this._posService.getPosAutoPopulate(this.branchId).subscribe(p => {
        this.model = p;
        this.model['branchId'] = this._dialogData['branchId'];
        this.model['userGroup'] = this.userGroup;

        this.fields = this._posService.getPosFields(this.userGroup);
      });
    } else {
      this.model = Object.assign({}, this._dialogData['pos']);
      this.model['userGroup'] = this.userGroup;

      this.fields = this._posService.getPosFields(this.userGroup);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._posService.update(this.model['id'], this.model).subscribe(data => {
        const snackBar = this._snackBar.open('POS Details', 'Updated', {
          duration: 1500
        });

        snackBar.afterDismissed().subscribe(x => {
          this._modalRef.close();
        });
      }, err => {
        if (err['status'] === 200) {
          const snackBar = this._snackBar.open('POS Details', 'Updated', {
            duration: 1500
          });

          snackBar.afterDismissed().subscribe(x => {
            this._modalRef.close();
          });
        }
      });
    } else {
      this._posService.create(this.model).subscribe(data => {
        const snackBar = this._snackBar.open('POS Details', 'Saved', {
          duration: 1500
        });

        snackBar.afterDismissed().subscribe(x => {
          this._modalRef.close();
        });
      }, err => {
        if (err['status'] === 200) {
          const snackBar = this._snackBar.open('POS Details', 'Updated', {
            duration: 1500
          });

          snackBar.afterDismissed().subscribe(x => {
            this._modalRef.close();
          });
        }
      });
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
