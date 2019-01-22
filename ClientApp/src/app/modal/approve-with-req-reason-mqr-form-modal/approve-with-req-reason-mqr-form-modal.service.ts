import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from 'src/app/services/drop-down.service';


@Injectable()
export class ApproveWithReqReasonMqrFormModalService {
  fields = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'select',
          key: 'awrsMqrRequirement',
          expressionProperties: {

          },
          templateOptions: {
            label: 'Requirement',
            required: true,
            options: this._dropDownService.getDropdown('AWR'),
            labelProp: 'value',
            valueProp: 'code'
          },
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'awrsMqrRemarks',
          templateOptions: {
            label: 'MAR Remarks'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'checkbox',
          key: 'chkAwrsComplied',
          expressionProperties: {
          },
          templateOptions: {
            label: 'Complied',
            indeterminate: false,
          },
        },

      ]
    },

  ];

  constructor(private _http: HttpClient, private _dropDownService: DropDownService) { }
  getFormlyFields(): FormlyFieldConfig[] {
    return this.fields;
  }

  getByAppReq(id): Observable<any> {
    return this._http.get(ApiConstants.approveWithReqReasonMqrApi + '/' + id);
  }

  create(appReq): Observable<any> {
    return this._http.post(ApiConstants.approveWithReqReasonMqrApi, appReq);
  }

  update(id, appReq): Observable<any> {
    return this._http.put(ApiConstants.approveWithReqReasonMqrApi + '/' + id, appReq);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.approveWithReqReasonMqrApi + '/' + id);
  }

}
