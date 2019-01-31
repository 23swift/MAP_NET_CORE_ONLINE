import { Component, AfterViewInit, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MAT_DATE_FORMATS, MatInput } from '@angular/material';

@Component({
  selector: 'app-calendar-type',
  templateUrl: './calendar-type.component.html',
  styleUrls: ['./calendar-type.component.css']
})
export class CalendarTypeComponent extends FieldType implements AfterViewInit {
  className: string;
  displayErrorOnInit: boolean;

  constructor() {
    super();

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.formControl.markAsTouched();
    });
  }

  getErrors() {
    if (this.formControl.errors.required) {
      return 'This field is required';
    } else if (this.formControl.errors.matDatepickerParse) {
      return 'This field has invalid date';
    }
  }
}
