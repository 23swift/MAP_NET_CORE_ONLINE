import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { OcularInspectionFormService } from './ocular-inspection-form.service';
import { AppBaseComponent } from '../../../app/app-base/app-base.component';
@Component({
  selector: 'app-ocular-inspection-form',
  templateUrl: './ocular-inspection-form.component.html',
  styleUrls: ['./ocular-inspection-form.component.css']
})
export class OcularInspectionFormComponent extends AppBaseComponent implements OnInit {
  @Input() displayMode: boolean = false;
  title: string = 'OIF Form';
  showWaive: boolean;

  constructor(private _ocularInspectionFormService: OcularInspectionFormService,
    private _route: ActivatedRoute,
    private _router: Router) {
      super(_route, _router);
      this.fields = _ocularInspectionFormService.getOIFFields();
      this.showWaive = +this._route.snapshot.params['id'] > 0 ? false : true;
  }

  ngOnInit() {

  }

  submit() {

  }

  public cancel() {
    const parentRoute = this._router.url.split('/(')[0];
    this._router.navigateByUrl(`${parentRoute}`);
  }

}
