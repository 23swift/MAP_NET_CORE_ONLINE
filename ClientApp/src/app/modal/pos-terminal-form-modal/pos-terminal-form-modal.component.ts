import { Component, OnInit, Inject } from '@angular/core';
import { PosTerminalFormModalService } from './pos-terminal-form-modal.service';
import { FormlyFieldConfig, FormlyFormOptions } from '../../../../node_modules/@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '../../../../node_modules/@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pos-terminal-form-modal',
  templateUrl: './pos-terminal-form-modal.component.html',
  styleUrls: ['./pos-terminal-form-modal.component.css'],
  providers: [PosTerminalFormModalService]
})
export class PosTerminalFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };

  constructor(private _terminalService: PosTerminalFormModalService, private _modalRef: MatDialogRef<PosTerminalFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, private _snackBar: MatSnackBar) {
    if (dialogData['posTerminal']) {
      this.model = Object.assign({}, dialogData['posTerminal']);
    } else {
      this.model = {
        posId: this.dialogData['posId']
      };
    }
    this.model['userGroup'] = dialogData['userGroup'];
    console.log(this.model);
   }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._terminalService.getPosTerminalFields();
  }


  submit() {
    if (this.model['id']) {
      this._terminalService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('Terminal Details', 'Updated', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    } else {
      this._terminalService.create(this.model).subscribe(data => {
        this._snackBar.open('Terminal Details', 'Saved', {
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
