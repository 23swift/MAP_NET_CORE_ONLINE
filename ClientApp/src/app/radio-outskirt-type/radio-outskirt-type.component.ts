import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput, MatRadioButton, MatFormFieldControl, MatDialogRef, MatDialog } from '@angular/material';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OutskirtReminderModalComponent } from '../modal/outskirt-reminder-modal/outskirt-reminder-modal.component';

@Component({
  selector: 'app-radio-outskirt-type',
  templateUrl: './radio-outskirt-type.component.html',
  styleUrls: ['./radio-outskirt-type.component.css']
})
export class RadioOutskirtTypeComponent extends FieldType implements OnInit {
  @ViewChild(MatRadioButton) MatFormFieldControl: MatRadioButton;

  constructor(private _matDialog: MatDialog) {
    super();
  }
  ngOnInit() {
  }

  showInfo(event) {
    if (event.value) {
      this._matDialog.open(OutskirtReminderModalComponent, {

      });
    }
  }
}