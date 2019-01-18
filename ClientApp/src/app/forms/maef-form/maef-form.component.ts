import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';
import { MaefFormService } from '../maef-form/maef-form.service';
import { MatSnackBar } from '@angular/material';
import { FormlyFieldConfigService } from 'src/app/services/formly-field-config.service';


@Component({
  selector: 'app-maef-form',
  templateUrl: './maef-form.component.html',
  styleUrls: ['./maef-form.component.css']
})
export class MaefFormComponent extends AppBaseComponent implements OnInit {
  @Input()displayMode:boolean=false;
  @Input()
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };
  fields: FormlyFieldConfig[];
  title: string = 'MAEF';
  subTitle: string = '';
  mode: string;
  reqId: number;

  private _maefFormService: MaefFormService;

  constructor(private maefFormService: MaefFormService, public route: ActivatedRoute,
    public router: Router, private _snackBar: MatSnackBar, private _formlyConfig: FormlyFieldConfigService) { 
      super(route, router);
      this._maefFormService = maefFormService;
      this.reqId = +this.route.snapshot.paramMap.get('id');    
      this._maefFormService.getMAEF(this.reqId).subscribe(data => {
        this.model = data;

       //console.log(this.model);
        this.model.displayMode = this.displayMode;
        this.getFields();
      });

    }

  ngOnInit() {
    this.title = 'MAEF';
    this.initialize();
  }

  public cancel() {
    this.router.navigateByUrl('/home/mauEncoder');
  }


  public getFields() {
    this.fields = this._maefFormService.getMaefFields();
    if (this.displayMode) {
      this._formlyConfig.disabled(this.fields);
    }
  }

  submit() {
    this.model['requestId'] = this.reqId;
    
    if (this.model['id']) {
     this._maefFormService.update(this.model['id'], this.model).subscribe(data => {
      this._snackBar.open('MAEF Details', 'Saved', {
        duration: 1500
      });
      this.model = data; 
    }); 
    } else 
    {
      this._maefFormService.create(this.model).subscribe(data => {
        this._snackBar.open('MAEF Details', 'Saved', {
          duration: 1500
        });
        this.model = data; 
      }); 
    }

  }


}
