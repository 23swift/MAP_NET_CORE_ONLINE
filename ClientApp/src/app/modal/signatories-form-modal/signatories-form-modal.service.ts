import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SignatoriesFormModalService {

  constructor(private _http: HttpClient) { }

  getFormlyFields(userGroup): FormlyFieldConfig[] {
    let fields = [];
    if (userGroup === 'ao') {
      fields = [
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
              key: 'signingAuthority',
              templateOptions: {
                label: 'Signing Authority',
                maxLength: 50
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
              key: 'position',
              templateOptions: {
                label: 'Position',
                maxLength: 22
              }
            },
            {
              className: 'flex-1',
              type: 'select',
              key: 'applicableTo',
              defaultValue: 1,
              templateOptions: {
                label: 'Applicable To',
                options: [
                  { label: 'Legal Name', value: 1 },
                  { label: 'Branch <DBA Name>', value: 2 }
                ]
              }
            }
          ]
        }
      ];
    } else if (userGroup === 'mdcs') {
      fields = [
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
              key: 'signingAuthority',
              templateOptions: {
                label: 'Signing Authority',
                maxLength: 50
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
              key: 'position',
              templateOptions: {
                label: 'Position',
                maxLength: 22
              }
            },
            {
              className: 'flex-1',
              type: 'select',
              key: 'applicableTo',
              defaultValue: 1,
              templateOptions: {
                label: 'Applicable To',
                options: [
                  { label: 'Legal Name', value: 1 },
                  { label: 'Branch <DBA Name>', value: 2 }
                ]
              }
            }
          ]
        }
      ];
    }

    return fields;
  }

  create(signatories): Observable<any> {
    return this._http.post(ApiConstants.signatoriesApi, signatories);
  }

  update(id, signatories): Observable<any> {
    return this._http.put(ApiConstants.signatoriesApi + '/' + id, signatories);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.signatoriesApi + '/' + id);
  }
}
