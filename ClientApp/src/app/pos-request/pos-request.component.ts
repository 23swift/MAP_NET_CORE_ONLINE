import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { PosFieldsService } from '../services/pos-fields.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { inherits } from 'util';
import { AppBaseComponent } from '../app-base/app-base.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-pos-request',
  templateUrl: './pos-request.component.html',
  styleUrls: ['./pos-request.component.css']
})
export class PosRequestComponent extends AppBaseComponent implements OnInit {
//  form = new FormGroup({});
//   model: any = {};
//   options: FormlyFormOptions = {};
//   fields:FormlyFieldConfig[];
   title:string='Pos Request';
  //  subTitle:string;
  //  mode:string; 
  constructor(private posFieldService: PosFieldsService,
    public route: ActivatedRoute,
    public router: Router) { 
    super(route,router);
     this.fields=posFieldService.getPosFields();
  }

  ngOnInit() {   
      this.initialize();
  }

  submit() {
    console.log(this.model);
  }

}
