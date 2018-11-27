import { Component, OnInit, Input } from '@angular/core';
import { AoMaintenanceFormService } from '../../ao-maintenance/ao-maintenance-form/ao-maintenance-form.service';
import { FormGroup } from '../../../../../node_modules/@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '../../../../../node_modules/@ngx-formly/core';
import { MatDialogRef } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-ao-maintenance-form',
  templateUrl: './ao-maintenance-form.component.html',
  styleUrls: ['./ao-maintenance-form.component.css'],
  providers: [AoMaintenanceFormService]
})
export class AoMaintenanceFormComponent implements OnInit {
  @Input() displayMode: boolean = false;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    showError: () => { 
      return true;
    }
  };
  title: string = 'AO Maintenance Form';
  subTitle: string;
  mode: string;
  fields: FormlyFieldConfig[];

  constructor(private _service: AoMaintenanceFormService,
    private _matDialogRef: MatDialogRef<AoMaintenanceFormComponent>) {
    this.fields = _service.getAoMaintenanceFormFields();
  }

  ngOnInit() {
  }

  cancel() {
    this._matDialogRef.close();
  }

  submit() {

  }
}
