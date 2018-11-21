import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '../../../node_modules/@angular/forms';
import { FormlyFieldConfig } from '../../../node_modules/@ngx-formly/core';
import { PosListContainerService } from './pos-list-container.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-pos-list-container',
  templateUrl: './pos-list-container.component.html',
  styleUrls: ['./pos-list-container.component.css'],
  providers: [PosListContainerService]
})
export class PosListContainerComponent implements OnInit {
  @Input() branchId: number;

  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options = {};

  constructor(private _service: PosListContainerService, private _router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._service.getFormlyFields();
    this.model = {};
  }

  submit() {
    
  }
}
