import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';
import { MamVerificationScreenFormService } from '../mam-verification-screen-form/mam-verification-screen-form.service';

@Component({
  selector: 'app-mam-verification-screen-form',
  templateUrl: './mam-verification-screen-form.component.html',
  styleUrls: ['./mam-verification-screen-form.component.css']
})
export class MamVerificationScreenFormComponent extends AppBaseComponent implements OnInit {
  @Input()displayMode:boolean=false;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  title: string = 'MAM Verification Screen';
  subTitle: string = '';
  mode: string;
  private _mamVerificationScreenFormService: MamVerificationScreenFormService;

  constructor(private mamVerificationScreenFormService: MamVerificationScreenFormService, public route: ActivatedRoute,
    public router: Router) { 
      super(route, router);
      this._mamVerificationScreenFormService = mamVerificationScreenFormService;
      this.getFields();
    }

  ngOnInit() {
    this.title = 'MAM Verification Screen';

    this.initialize();
  }

  public create() {
    alert('Create branch');
  }

  public update() {
    alert('Update Branch');
    alert(this.route.snapshot.paramMap.get('id'));
  }

  public cancel() {
    this.router.navigateByUrl('/naStep/create');
  }


  public getFields() {
    this.fields = this._mamVerificationScreenFormService.getMamVerFields();
  }
  submit() {
    
  }
}
