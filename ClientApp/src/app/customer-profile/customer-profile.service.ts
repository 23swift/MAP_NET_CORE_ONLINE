import { Injectable } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';

@Injectable()
export class CustomerProfileService {
  aoFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'legalName',
          templateOptions: {
            label: 'Business/Legal Name',
            placeholder: 'Business Name'
          },
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'ownership',
          templateOptions: {
            label: 'Ownership',
            options: [
              { label: 'Single Proprietorship', value: 1 },
              { label: 'Partnership', value: 2 },
              { label: 'Corporation', value: 3 },
              { label: 'Registered Association, Cooperative & Organization', value: 4 },
              { label: 'GOCC', value: 5 },
              { label: 'Resident Foreign Corporation', value: 6 },
              { label: 'Resident Foreign Partnership', value: 7 },
              { label: 'Branch or Representative Office of Foreign Corporation/Company', value: 8 },
              { label: 'Foreign Individual/Single Proprietorship', value: 9 },
              { label: 'Others', value: 10 }
            ]
          }
        },
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'dtiRegDate',
          templateOptions: {
            label: 'Sec/DTI Registration Date'
          }
        }
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'registeredBusinessNumber',
          templateOptions: {
            label: 'Registered Business Number',
            maxLength: 11
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'customerNumber',
          templateOptions: {
            label: 'Customer Number',
            maxLength: 12
          }
        }
      ]
    }
  ];

  mdcsFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'legalName',
          templateOptions: {
            label: 'Business/Legal Name',
            placeholder: 'Business Name',
            disabled: true
          },
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'ownership',
          templateOptions: {
            label: 'Ownership',
            options: [
              { label: 'Single Proprietorship', value: 1 },
              { label: 'Partnership', value: 2 },
              { label: 'Corporation', value: 3 },
              { label: 'Registered Association, Cooperative & Organization', value: 4 },
              { label: 'GOCC', value: 5 },
              { label: 'Resident Foreign Corporation', value: 6 },
              { label: 'Resident Foreign Partnership', value: 7 },
              { label: 'Branch or Representative Office of Foreign Corporation/Company', value: 8 },
              { label: 'Foreign Individual/Single Proprietorship', value: 9 },
              { label: 'Others', value: 10 }
            ],
            disabled: true
          }
        },
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'dtiRegDate',
          templateOptions: {
            label: 'Sec/DTI Registration Date'
          }
        }
      ],
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'registeredBusinessNumber',
          templateOptions: {
            label: 'Registered Business Number',
            maxLength: 11
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'customerNumber',
          templateOptions: {
            label: 'Customer Number',
            maxLength: 12,
            disabled: true
          }
        }
      ]
    }
  ];

  constructor(private _http: HttpClient) { }

  getCustomerProfileFields(userGroup): FormlyFieldConfig[] {
    let fields;
    if (userGroup === 'ao') {
      fields = this.aoFields;
    } else if (userGroup === 'mdcs') {
      fields = this.mdcsFields;
    }

    return fields;
  }

  create(customerProfile): Observable<any> {
    return this._http.post(ApiConstants.customerProfileApi, customerProfile);
  }

  update(id, customerProfile): Observable<any> {
    return this._http.put(ApiConstants.customerProfileApi + '/' + id, customerProfile);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.customerProfileApi + '/' + id);
  }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.customerProfileApi + '/' + id);
  }
}

