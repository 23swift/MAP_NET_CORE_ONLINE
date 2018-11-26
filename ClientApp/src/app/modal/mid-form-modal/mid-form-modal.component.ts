import { Component, OnInit, Input, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MidFormModalService } from './mid-form-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mid-form-modal',
  templateUrl: './mid-form-modal.component.html',
  styleUrls: ['./mid-form-modal.component.css'],
  providers: [MidFormModalService]
})
export class MidFormModalComponent implements OnInit {
  @Input() displayMode = false;
  model: Object;
  form: FormGroup;
  fields: FormlyFieldConfig[];
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };

  constructor(private _route: ActivatedRoute, private _router: Router, private _midService: MidFormModalService,
  private _modalRef: MatDialogRef<MidFormModalComponent>,
  @Inject(MAT_DIALOG_DATA) public dialogData: any, private _snackBar: MatSnackBar) {
    if (dialogData['mid']) {
      this.model = Object.assign({}, dialogData['mid']);
    } else {
      this.model = {
        branchId: this.dialogData['branchId']
      };
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._midService.getFormlyFields();
  }

  submit() {
    if (this.model['id']) {
      this._midService.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('MID Details', 'Updated', {
          duration: 1000
        });
        snackBarRef.afterDismissed().subscribe(x => {
          this._modalRef.close(data);
        });
      });
    } else {
      this._midService.create(this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('MID Details', 'Saved', {
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
