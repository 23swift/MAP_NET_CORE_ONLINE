import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OifFormModalService } from '../../modal/oif-form-modal/oif-form-modal.service';
import { AppBaseComponent } from '../../../app/app-base/app-base.component';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-ocular-inspection-form',
  templateUrl: './ocular-inspection-form.component.html',
  styleUrls: ['./ocular-inspection-form.component.css'],
  providers: [OifFormModalService]
})
export class OcularInspectionFormComponent extends AppBaseComponent implements OnInit {
  @Input()branchId:number;
  @Input()showButton:boolean;
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };
  displayMode = false;

  constructor(private _oifFormModalService: OifFormModalService,
    private _route: ActivatedRoute,
    private _router: Router, private _snackBar: MatSnackBar) {
      super(_route, _router);
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this._oifFormModalService.getOifAutoPopulate(this.branchId).subscribe(data => {
      this.model = data;
      console.log(data);

      this.getFields();
    });  
  }

  submit() {

  }



  public cancel() {
    const parentRoute = this._router.url.split('/(')[0];
    this._router.navigateByUrl(`${parentRoute}`);
  }

  public getFields() {
    this.fields = this._oifFormModalService.getOIFFields();
  }

}
