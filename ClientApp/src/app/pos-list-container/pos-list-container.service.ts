import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class PosListContainerService {

  constructor() { }

  getFormlyFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'input',
            key: 'dbaName',
            templateOptions: {
              label: 'DBA Name(DBA/Trade Name)',
              placeholder: 'DBA Name(DBA/Trade Name)',
              required: true,
              maxLength: 22
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'adminContactPerson',
            templateOptions: {
              label: 'Administrator(Contact Person)',
              placeholder: 'Administrator(Contact Person)',
              required: true,
              maxLength: 30
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
            key: 'dbaAddress1',
            templateOptions: {
              label: 'DBA(Branch/Outlet Address )',
              placeholder: 'DBA(Branch/Outlet Address )',
              maxLength: 30,
              required: true
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
            key: 'dbaAddress2',
            templateOptions: {
              maxLength: 30
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
            key: 'dbaAddress3',
            templateOptions: {
              maxLength: 30
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
            key: 'dbaAddress4',
            templateOptions: {
              maxLength: 30
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
            key: 'dbaCity',
            templateOptions: {
              label: 'DBA City',
              required: true,
              options: [
                { label: 'PASIG', value: 1 },
                { label: 'MAKATI CITY', value: 2 },
                { label: 'MANDALUYONG', value: 3 },
                { label: 'PASAY CITY', value: 4 },
                { label: 'SAN JUAN', value: 5 },
                { label: 'VALENZUELA', value: 6 },
                { label: 'QUEZON CITY', value: 7 },
                { label: 'MANILA', value: 8 }
              ]
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'branchPhoneNumber',
            templateOptions: {
              label: 'Branch/Outlet Phone Number',
              placeholder: 'Branch/Outlet Phone Number',
              maxLength: 20
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'branchMobileNumber',
            templateOptions: {
              label: 'Mobile Number',
              placeholder: 'Mobile Number',
              maxLength: 15
            }
          }
        ]
      }
    ];
  }
}
