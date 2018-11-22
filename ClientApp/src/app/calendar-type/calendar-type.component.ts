import { Component, ViewChild, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { MatInput } from '@angular/material';
import { startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar-type',
  templateUrl: './calendar-type.component.html',
  styleUrls: ['./calendar-type.component.css']
})
export class CalendarTypeComponent extends FieldType implements OnInit {
  @ViewChild(MatInput) formFieldControl: MatInput;
  className: string;

  ngOnInit() {
  }

}
