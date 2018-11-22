import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { inherits } from 'util';
import { AppBaseComponent } from '../../../app/app-base/app-base.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PosFormService } from './pos-form.service';
import { FormlyFieldConfigService } from '../../services/formly-field-config.service';

@Component({
  selector: 'app-pos-form',
  templateUrl: './pos-form.component.html',
  styleUrls: ['./pos-form.component.css'],
  providers: [PosFormService]
})
export class PosFormComponent extends AppBaseComponent implements OnInit {

  userGroup: string;
  @Input() displayMode: boolean;
  constructor(private _posFormService: PosFormService, private _route: ActivatedRoute, private _router: Router, private _formService: FormlyFieldConfigService) {
    super(_route, _router);
    this.userGroup = 'ao';
    this.fields = _posFormService.getPosFields(this.userGroup);
  }

  ngOnInit() {
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
