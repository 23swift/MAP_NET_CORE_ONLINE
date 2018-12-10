import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from 'src/app/services/drop-down.service';
@Injectable()
export class ApproveWithExceptReasonDetailsModalService {
  fields = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'awerdDate',
          templateOptions: {
            label: 'Date',
            maxLength: 50
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'awerdRequirement',
          templateOptions: {
            label: 'Requirement'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'awerdRemarks',
          templateOptions: {
            label: 'Remarks'
          }
        }
      ]
    },
  
  ];
  constructor(private _http: HttpClient, private _dropDownService: DropDownService) { }
  getFormlyFields(): FormlyFieldConfig[] {
    return this.fields;
  }

  getByAppEx(id): Observable<any> {
    return this._http.get(ApiConstants.approveWithExceptDetailsApi + '/' + id);
  }
  
  create(appEx): Observable<any> {
    return this._http.post(ApiConstants.approveWithExceptDetailsApi, appEx);
  }
  
  update(id, appEx): Observable<any> {
    return this._http.put(ApiConstants.approveWithExceptDetailsApi + '/' + id, appEx);
  }
  
  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.approveWithExceptDetailsApi + '/' + id);
  }



}






