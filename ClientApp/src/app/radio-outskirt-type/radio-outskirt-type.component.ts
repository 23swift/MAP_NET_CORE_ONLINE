import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput, MatRadioButton, MatFormFieldControl, MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatRadioChange, MatRadioButtonBase } from '@angular/material';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OutskirtReminderModalComponent } from '../modal/outskirt-reminder-modal/outskirt-reminder-modal.component';

@Component({
  selector: 'app-radio-outskirt-type',
  templateUrl: './radio-outskirt-type.component.html',
  styleUrls: ['./radio-outskirt-type.component.css']
})
export class RadioOutskirtTypeComponent extends FieldType implements OnInit {
  @ViewChild(MatRadioChange) MatFormFieldControl: MatRadioChange;
  value: any;
  constructor(private _matDialog: MatDialog) {
    super();
  }
  ngOnInit() {
  }

  showInfo(event) {
   // console.log(event)
    if (event.value === 'true') {
      this._matDialog.open(OutskirtReminderModalComponent, {
          data: event
      });
    }
  }
}
