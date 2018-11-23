import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput, MatRadioButton, MatFormFieldControl } from '@angular/material';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-outskirt-reminder-modal',
  templateUrl: './outskirt-reminder-modal.component.html',
  styleUrls: ['./outskirt-reminder-modal.component.css']
})
export class OutskirtReminderModalComponent extends FieldType implements OnInit {
  @ViewChild(MatRadioButton) MatFormFieldControl: MatRadioButton;

  ngOnInit() {
  }

  
}
