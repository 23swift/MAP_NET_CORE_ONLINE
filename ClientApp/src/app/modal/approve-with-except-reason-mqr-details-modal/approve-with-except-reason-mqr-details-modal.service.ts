import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from 'src/app/services/drop-down.service';

@Injectable()
export class ApproveWithExceptReasonMqrDetailsModalService {
  fields = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'awerdMqrDate',
          templateOptions: {
            label: 'Date',
            maxLength: 50
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'awerdMqrRequirement',
          templateOptions: {
            label: 'Requirement',
            required: true,
            options: this._dropDownService.getDropdown('AWR'),
            labelProp: 'value',
            valueProp: 'code'
          },
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'awerdMqrRemarks',
          templateOptions: {
            label: 'MAR Remarks'
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
    return this._http.get(ApiConstants.approveWithExceptDetailsMqrApi + '/' + id);
  }

  create(appEx): Observable<any> {
    return this._http.post(ApiConstants.approveWithExceptDetailsMqrApi, appEx);
  }

  update(id, appEx): Observable<any> {
    return this._http.put(ApiConstants.approveWithExceptDetailsMqrApi + '/' + id, appEx);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.approveWithExceptDetailsMqrApi + '/' + id);
  }


}
