import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';

@Injectable()
export class OwnersFormModalService {

  constructor(private _http: HttpClient) { }

  getFormlyFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'input',
            key: 'name',
            templateOptions: {
              label: 'Name',
              maxLength: 50
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'percentOfOwnership',
            templateOptions: {
              label: '% of Ownership',
              pattern: '^\\d{1,2}$|100'
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'select',
            key: 'typeOfRelatedParty',
            defaultValue: 0,
            templateOptions: {
              label: 'Type of Related Party',
              options: [
                { label: 'N/A', value: 0 },
                { label: 'DOSRI', value: 1 },
                { label: 'Subsidiary', value: 2 },
                { label: 'Affiliate', value: 3 },
                { label: 'Other Related Party', value: 4 }
              ]
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'remarks',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['typeOfRelatedParty'] !== undefined && model['typeOfRelatedParty'] !== 0;
              }
            },
            templateOptions: {
              label: 'Remarks',
              maxLength: 120
            }
          }
        ]
      }
    ];
  }

  create(owners): Observable<any> {
    return this._http.post(ApiConstants.ownersApi, owners);
  }

  update(id, owners): Observable<any> {
    return this._http.put(ApiConstants.ownersApi + '/' + id, owners);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.ownersApi + '/' + id);
  }
}
