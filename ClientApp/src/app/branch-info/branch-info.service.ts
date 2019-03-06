import { Injectable } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from 'src/app/services/drop-down.service';

@Injectable({
  providedIn: 'root'
})
export class BranchInfoService {


  constructor(private _http: HttpClient, private _dropDownService: DropDownService) {    
  }

}
