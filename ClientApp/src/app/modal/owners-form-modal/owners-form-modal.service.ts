import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { DropDownService } from 'src/app/services/drop-down.service';

@Injectable()
export class OwnersFormModalService {

  constructor(private _http: HttpClient, private _dropDownService: DropDownService) { }

  getFormlyFields(userGroup): FormlyFieldConfig[] {
    let fields = [];
    if (userGroup === 'ao' || userGroup === 'mauEncoder' || userGroup === 'approver') {
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
              defaultValue: 'N/A',
              templateOptions: {
                label: 'Type of Related Party',
                options: this._dropDownService.getDropdown('TORP'),
                labelProp: 'value',
                valueProp: 'code',
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'remarks',
              expressionProperties: {
                'templateOptions.required': (model: any, formState: any) => {
                  return model['typeOfRelatedParty'] !== 'N/A';
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
              defaultValue: 'N/A',
              templateOptions: {
                label: 'Type of Related Party',
                options: this._dropDownService.getDropdown('TORP'),
                labelProp: 'value',
                valueProp: 'code'
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'remarks',
              expressionProperties: {
                'templateOptions.required': (model: any, formState: any) => {
                  return model['typeOfRelatedParty'] !== 'N/A';
                }
              },
              templateOptions: {
                label: 'Remarks',
                maxLength: 120,
                disabled: true
              }
            }
          ]
        }
      ];
    }
    else if (userGroup === 'mqrUser') { 
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
                maxLength: 50,
              }
            },
            {
              className: 'flex-1',
              type: 'input',
              key: 'percentOfOwnership',
              templateOptions: {
                label: '% of Ownership',
                pattern: '^\\d{1,2}$|100',
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
              defaultValue: 'N/A',
              templateOptions: {
                label: 'Type of Related Party',
                options: this._dropDownService.getDropdown('TORP'),
                labelProp: 'value',
                valueProp: 'code',
              }
            }
          ]
        }
      ];
    }
    return fields;
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
