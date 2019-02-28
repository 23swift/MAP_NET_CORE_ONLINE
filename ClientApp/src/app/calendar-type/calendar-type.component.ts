import { Component, AfterViewInit, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MatInput, MAT_DATE_LOCALE, DateAdapter } from '@angular/material';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment} from 'moment';

// const moment = _rollupMoment || _moment;
const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DDMMMYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-calendar-type',
  templateUrl: './calendar-type.component.html',
  styleUrls: ['./calendar-type.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class CalendarTypeComponent extends FieldType implements AfterViewInit {
  className: string;
  displayErrorOnInit: boolean;
  value: string;

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
