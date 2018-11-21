import { Component, OnInit, Input } from '@angular/core';
import { BuMaintenanceFormService } from './bu-maintenance-form.service';
import { FormGroup } from '../../../../../node_modules/@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '../../../../../node_modules/@ngx-formly/core';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-bu-maintenance-form',
  templateUrl: './bu-maintenance-form.component.html',
  styleUrls: ['./bu-maintenance-form.component.css'],
  providers: [BuMaintenanceFormService]
})
export class BuMaintenanceFormComponent implements OnInit {
  @Input() displayMode: boolean = false;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  title: string = 'BU Maintenance Form';
  subTitle: string;
  mode: string;
  fields: FormlyFieldConfig[];

  constructor(private _service: BuMaintenanceFormService,
              private _matDialogRef: MatDialogRef<BuMaintenanceFormComponent>) {
      this.fields = _service.getBuMaintenanceFields();
  }

  ngOnInit() {
  }

  cancel() {
    this._matDialogRef.close();
  }
  submit() {
    
  }
}
