import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '../../../node_modules/@angular/forms';
import { FormlyFieldConfig } from '../../../node_modules/@ngx-formly/core';
import { PosListContainerService } from './pos-list-container.service';
import { Router } from '../../../node_modules/@angular/router';
import { BranchFormService } from '../forms/branch-form/branch-form.service';
import { FormlyFieldConfigService } from '../services/formly-field-config.service';

@Component({
  selector: 'app-pos-list-container',
  templateUrl: './pos-list-container.component.html',
  styleUrls: ['./pos-list-container.component.css'],
  providers: [PosListContainerService]
})
export class PosListContainerComponent implements OnInit, AfterViewInit {
  @Input() branchId: number;

  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options = {};
  @Input() showBranchInfo = true;
  @Input() userGroup: string;
  @Input() showAdd: boolean;
  @Input() showDelete: boolean;
  @Input() displayMode: boolean;
  @Input() showTerminalUpdate: boolean;
  @Input() showTerminalAdd: boolean;
  @Input() showTerminalDelete: boolean;

  constructor(private _service: PosListContainerService, private _router: Router, private _branchService: BranchFormService,
    private _formlyFieldConfigService: FormlyFieldConfigService) {
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._service.getFormlyFields();

    this._formlyFieldConfigService.disabled(this.fields);
  }

  ngAfterViewInit() {
    this._branchService.get(this.branchId).subscribe(data => {
      this.model = data;
    });
  }

  submit() {

  }
}
