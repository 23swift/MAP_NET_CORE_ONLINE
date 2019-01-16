import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable()
export class SearchModalService {
  constructor() { }

  mdcsEncoder: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'legalName',
          templateOptions: {
            label: 'Business Name/Legal Name',
            placeholder: 'Business Name/Legal Name'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'dbaName',
          templateOptions: {
            label: 'DBA Name(DBA/Trade Name)',
            placeholder: 'DBA Name(DBA/Trade Name)'
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
          key: 'aoName',
          templateOptions: {
            label: 'AO Name',
            placeholder: 'AO Name',
            disabled: true
          }
        }
      ]
    }
  ];

  mqr: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'trackingNo',
          templateOptions: {
            label: 'RT No.',
            placeholder: 'RT No.'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'requestType',
          templateOptions: {
            label: 'Request Type',
            placeholder: 'Request Type'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'dbaName',
          templateOptions: {
            label: 'DBA Name',
            placeholder: 'DBA Name'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'createdDate',
          templateOptions: {
            label: 'Date Requested',
            placeholder: '01/01/1990'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'status',
          templateOptions: {
            label: 'Request Status',
            placeholder: 'Request Status'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'aoName',
          templateOptions: {
            label: 'AO Name',
            placeholder: 'AO Name'
          }
        }
      ]
    }
  ];

  mdmUser: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'legalName',
          templateOptions: {
            label: 'Business Name/Legal Name',
            placeholder: 'Business Name/Legal Name'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'dbaName',
          templateOptions: {
            label: 'DBA Name(DBA/Trade Name)',
            placeholder: 'DBA Name(DBA/Trade Name)'
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
          key: 'aoName',
          templateOptions: {
            label: 'AO Name',
            placeholder: 'AO Name',
            disabled: true
          }
        }
      ]
    }
  ];

  getFields(userGroup): FormlyFieldConfig[] {
    let fields = [];

    if (userGroup === 'mdcsEncoder' || userGroup === 'mdcsChecker') {
      fields = this.mdcsEncoder;
    } else if (userGroup === 'mqr') {
      fields = this.mqr;
    } else if (userGroup === 'mdmUser') {
      fields = this.mdmUser;
    }

    return fields;
  }
}
