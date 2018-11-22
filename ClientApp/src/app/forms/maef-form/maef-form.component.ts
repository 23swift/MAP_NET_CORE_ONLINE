import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';
import { MaefFormService } from '../maef-form/maef-form.service';


@Component({
  selector: 'app-maef-form',
  templateUrl: './maef-form.component.html',
  styleUrls: ['./maef-form.component.css']
})
export class MaefFormComponent extends AppBaseComponent implements OnInit {
  @Input()displayMode:boolean=false;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];
  title: string = 'MAEF';
  subTitle: string = '';
  mode: string;
  private _maefFormService: MaefFormService;

  constructor(private maefFormService: MaefFormService, public route: ActivatedRoute,
    public router: Router) { 
      super(route, router);
      this._maefFormService = maefFormService;
      this.getFields();
    }

  ngOnInit() {
    this.title = 'MAEF';
    // this.baseCreateFunction=this.create;
    // this.baseUpdateFunction=this.update;

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
    this.fields = this._maefFormService.getMaefFields();
  }

  submit() {
    
  }

}
