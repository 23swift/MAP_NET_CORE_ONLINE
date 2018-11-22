import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MidFormService } from './mid-form.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AppBaseComponent } from '../../../app/app-base/app-base.component';

@Component({
  selector: 'app-mid-form',
  templateUrl: './mid-form.component.html',
  styleUrls: ['./mid-form.component.css'],
  providers: [MidFormService]
})
export class MidFormComponent extends AppBaseComponent implements OnInit {
  @Input()displayMode = false;
  model: Object;
  form: FormGroup;
  fields: FormlyFieldConfig[];

  constructor(private _route: ActivatedRoute, private _router: Router, private _service: MidFormService) {
    super(_route, _router);

   }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._service.GetFormlyFields();
    this.model = {};
  }

  Submit() {
    console.log(this.model);
    const parentRoute = this._router.url.split('/(')[0];
    this._router.navigateByUrl(`${parentRoute}`);
  }

  public cancel() {
    const parentRoute = this._router.url.split('/(')[0];
    this._router.navigateByUrl(`${parentRoute}`);
  }

  Cancel() {
    // const currentUrl = this._router.url.split('/(');
    // const parentRoute = currentUrl[0] + '/(' + currentUrl[1] + ')';
    // this._router.navigateByUrl(`${parentRoute}`);
  }
  // mode: string;
  // midForm: FormGroup;
  // monitorCodeList: Object[];
  // merchantGroupCodeList: Object[];
  // currencyList: Object[];
  // sfrStraightList: Object[];

  // constructor(private _route: ActivatedRoute, private _router: Router, private _service: MidFormService) { }

  // ngOnInit() {
  //   this.midForm = new FormGroup({
  //     currency: new FormControl(''),
  //     monitorCode: new FormControl(''),
  //     majorPurchase: new FormControl(''),
  //     offUs: new FormControl(''),
  //     sfrStraight: new FormControl(''),
  //     merchantGroupCode: new FormControl('')
  //   });
  //   this.monitorCodeList = this._service.GetMonitorCodeList();
  //   this.merchantGroupCodeList = this._service.GetMerchantGroupCode();
  //   this.currencyList = this._service.GetCurrency();
  //   this.sfrStraightList = this._service.GetSfrStraightList();

  //   this.midForm.get('majorPurchase').valueChanges.subscribe( (mp: boolean) => {
  //     if (mp) {
  //       this.midForm.controls['sfrStraight'].setValidators([Validators.required]);
  //       this.midForm.controls['sfrStraight'].updateValueAndValidity();
  //     }
  //   });
  // }
}
