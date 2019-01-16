import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { inherits } from 'util';
import { AppBaseComponent } from '../../../app/app-base/app-base.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PosFormService } from './pos-form.service';
import { FormlyFieldConfigService } from '../../services/formly-field-config.service';
import { PosListService } from 'src/app/pos-list/pos-list.service';

@Component({
  selector: 'app-pos-form',
  templateUrl: './pos-form.component.html',
  styleUrls: ['./pos-form.component.css'],
  providers: [PosFormService]
})
export class PosFormComponent implements OnInit {

  @Input() userGroup: string;
  @Input() displayMode: boolean;
  @Input() branchId: number;
  fields = [];
  form: FormGroup;
  model: any;
  options: any;
  constructor(private _posFormService: PosFormService, private _route: ActivatedRoute,
    private _router: Router, private _formService: FormlyFieldConfigService, private _posListService: PosListService) {
    this.fields = this._posFormService.getPosFields(this.userGroup);
  }

  ngOnInit() {
    // this._posListService.get(this.branchId)
    this._posFormService.getPosFields(this.userGroup);
    if (this.displayMode) {
      this._formService.disabled(this.fields);
    } else {
      this._formService.enabled(this.fields);
    }
  }

  public cancel() {
    const parentRoute = this._router.url.split('/(')[0];
    this._router.navigateByUrl(`${parentRoute}`);
  }

  submit() {
    
  }
}
