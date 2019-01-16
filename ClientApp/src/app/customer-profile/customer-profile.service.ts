import { Injectable } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';
import { DropDownService } from '../services/drop-down.service';

@Injectable()
export class CustomerProfileService {
  ownershipList = [];
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
            placeholder: 'Business Name',
            required: true,
            maxLength: 50
          },
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'ownership',
          templateOptions: {
            label: 'Ownership',
            required: true,
            options: this._dropDownService.getDropdown('OW'),
            labelProp: 'value',
            valueProp: 'code'
          }
        },
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'dtiRegDate',
          templateOptions: {
            label: 'Sec/DTI Registration Date',
            required: true
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
            options: this._dropDownService.getDropdown('OW'),
            labelProp: 'value',
            valueProp: 'code',
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

  psServicngFields: FormlyFieldConfig[] = [
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
            options: this._dropDownService.getDropdown('OW'),
            labelProp: 'value',
            valueProp: 'code',
            disabled: true
          }
        },
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'dtiRegDate',
          templateOptions: {
            label: 'Sec/DTI Registration Date',
            disabled: true
          }
        }
      ],
    },
  ];

  constructor(private _http: HttpClient, private _dropDownService: DropDownService) {
      // this._dropDownService.getDropdown('OW').subscribe(data => {
      //   this.ownershipList = data;
      //   console.log(data);
      // });
  }

  getCustomerProfileFields(userGroup): FormlyFieldConfig[] {
    let fields;
    if (userGroup === 'ao' || userGroup === 'mauEncoder' || userGroup === 'approver') {
      fields = this.aoFields;
    } else if (userGroup === 'mdcs') {
      fields = this.mdcsFields;
    } else if (userGroup === 'psServicing') {
      fields = this.psServicngFields;
    } else if (userGroup === 'mdmUser') {
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

