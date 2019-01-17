import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from 'src/app/services/drop-down.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';

@Injectable()
export class ApproveWithExceptReasonAwrDetailsModalService {
  fields = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'awerdAwrDate',
          templateOptions: {
            label: 'Date',
            maxLength: 50
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'awerdAwrRequirement',
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
          key: 'awerdAwrRemarks',
          templateOptions: {
            label: 'AWR MAEF Remarks'
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
    return this._http.get(ApiConstants.approveWithExceptDetailsAwrApi + '/' + id);
  }

  create(appEx): Observable<any> {
    return this._http.post(ApiConstants.approveWithExceptDetailsAwrApi, appEx);
  }

  update(id, appEx): Observable<any> {
    return this._http.put(ApiConstants.approveWithExceptDetailsAwrApi + '/' + id, appEx);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.approveWithExceptDetailsAwrApi + '/' + id);
  }
}
