import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PosFormModalService {

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'checkbox',
          key: 'isWaved',
          defaultValue: false,
          templateOptions: {
            indeterminate: false,
            label: 'Waive POS'
          }
        },
        {
          className: 'flex-1',
          type: 'checkbox',
          key: 'isShared',
          templateOptions: {
            indeterminate: false,
            label: 'Shared POS'
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
          key: 'natureOfRequest',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Nature Of Request',
            options: [
              { value: 1, label: 'Installation' },
              { value: 2, label: 'Reprogramming' },
              { value: 3, label: 'TID Issuance' }
            ]
          },
          lifecycle: {
            onInit: (form, field) => {
              field.formControl.valueChanges.subscribe(v => {
                if (v === 3) {
                  form.get('numberOfPrintedSlips').patchValue('2');
                } else {
                  form.get('numberOfPrintedSlips').patchValue('');
                }
              });
            }
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'reprogrammingType',
          defaultValue: 0,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 2 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 2 && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Reprogramming Type',
            options: [
              { value: 0, label: 'Select Reprogramming Type' }
            ]
          }
        },
        /*  {
            className: 'flex-1',
            type: 'select',
            key: 'tidIssuanceType',
            defaultValue: 0,
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return model['natureOfRequest'] !== 3;
              }
            },
            templateOptions: {
              label: 'TID Issuance Type',
              options: [
                { value: 0, label: 'Select TID Issuance Type' }
              ]
            }
          } */
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'requestersName',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Requester\'s Name',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'requestersBusinessUnit',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Requester\'s Business Unit',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'requestersContactNumber',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Requester\'s Contact Number / Cellphone Number',
            pattern: '^(\\d{2})-\\d{3}-\\d{2}-\\d{2}$',
            type: 'number',
            maxLength: 50,
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
          key: 'area',
          defaultValue: 0,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Business Unit / Area (where POS will be charged)',
            options: [
              { value: 0, label: 'Select Business Unit / Area' }
            ]
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'accountOfficerHandler',
          defaultValue: 0,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Account Officer / Handler',
            options: [
              { value: 0, label: 'Select Account Officer Handler' }
            ]
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'businessTypeOfAccount',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Business Type Of Account (AO / RM / HO)',
            valueProp: 'BusinessTypeOfAcccount_Id',
            labelProp: 'Description',
            options: [
              { BusinessTypeOfAcccount_Id: '1', Description: 'AO' },
              { BusinessTypeOfAcccount_Id: '2', Description: 'RM' },
              { BusinessTypeOfAcccount_Id: '3', Description: 'HO' }
            ]
          },
          defaultValue: '1'
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'select',
          key: 'businessUnitAO',
          defaultValue: 0,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2) && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Business Unit (AO\'s Business Unit)',
            options: [
              { label: 'Select Business Unit', value: 0 }
            ]
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'segment',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2) || model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Segment',
            maxLength: 50,
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
          key: 'approvedBy',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Approved By (Business Unit Head)',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'merchantLegalName',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Merchant\'s Legal Name',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'merchantDBAName',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Merchant\'s DBA Name',
            maxLength: 50,
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
          key: 'merchantNameOnSignage',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Merchant\'s Name on Signage',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'merchantDbaAddress',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Merchant\'s DBA Address',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'merchantDbaAddressOld',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Merchant\'s DBA Address (old)',
            maxLength: 150,
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
          key: 'merchantDbaCity',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Merchant\'s DBA City',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          key: 'isContactlessMerchant',
          type: 'radio',
          defaultValue: true,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Contactless Merchant?',
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ]
          }
        },
        {
          className: 'flex-1',
          key: 'isMultiMerchant',
          type: 'radio',
          defaultValue: false,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Multi-Merchant?',
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ]
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
          key: 'merchantCategoryCode',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Merchant Category Code (MCC)',
            type: 'number'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'nsp',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'NSP',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'contactPerson',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Contact Person (Outlet / Branch) Name / Email Address)',
            maxLength: 50,
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
          key: 'contactNumber',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Contact Number (Outlet / Branch) Landline / Mobile Phone)',
            pattern: '^(\\d{2})-\\d{3}-\\d{2}-\\d{2}$|^[\\d\\d\\d|\\d\\d\\d\\d]-\\d{8}$',
            type: 'number',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'numberOfPrintedSlips',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2) || model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Number of Printed Slips',
            maxLength: 10,
            type: 'number'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'reasonForThreeSlipsPrinting',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Reason For 3 Slips Printing',
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
          type: 'calendar',
          key: 'requiredDateAndTimeOfDispatch',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 || model['natureOfRequest'] !== 2) || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Required Date and Time of Dispatch',
          }
        },
        {
          className: 'flex-1',
          type: 'radio',
          key: 'isInstallationTerm',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Installation Term',
            options: [
              { value: true, label: 'Permanent' },
              { value: false, label: 'Temporary' },
            ]
          }
        },
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'requiredPullOutDateForTempPOSTerminals',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Required Pull Out Date For Temporary POS Terminals',
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
          key: 'reasonForPermanentGPRSInstallation',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Reason For Permanent GPRS Installation',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'otherRequiredProfilingFacility',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2) && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Other Required Profiling Facility (tip adjust, binver, BDO Pay, etc)',
            maxLength: 100,
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'mustSettle',
          defaultValue: 0,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2) && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Must Settle (No. of Days Required)',
            options: [
              { value: 0, label: 'Select No. of Days Required' }
            ]
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
          key: 'remarksSpecialInstructions',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 || model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Remarks / Special Instructions (Dispatch-Related Only)',
            maxLength: 300,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'creditStraightTidExisting',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 2 || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Credit Straight TID (existing)'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'creditStraightTidNew',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Credit Straight TID (new)',
            maxLength: 50,
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
          key: 'dateAndTimeEndorsedToMAU',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Date and Time Endorsed To MAU',
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'creditStraightMidVmjaVmjacd',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Credit Straight MID-VMJA/VMJACD',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'creditStraightMidVmj',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Credit Straight MID-VMJ',
            maxLength: 50,
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
          key: 'creditStraightMidAmex',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Credit Straight MID-AMEX (If with VMJ)',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'dinersMID',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Credit Straight MID-Diners (If with VMJ)',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'cupAcceptorId',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'CUP Acceptor ID',
            maxLength: 50,
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
          key: 'merchantLoyalty',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Merchant Loyalty',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'merchantPrepaid',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Merchant Prepaid',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'creditStraightMidVmjaVmjacVmjacd',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Credit Straight MID-VMJA/VMJAC/VMJACD',
            maxLength: 50,
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
          key: 'creditStraightMidVmjaVmjacVmjacdNew',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 2 && model['natureOfRequest'] !== 3) || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 2 || model['natureOfRequest'] === 3) && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Credit Straight MID-VMJA/VMJAC/VMJACD (New)',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'creditStraightMidVmjaVmjacVmjacdOffUs',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 2 && model['natureOfRequest'] !== 3) || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 2 || model['natureOfRequest'] === 3) && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Credit Straight MID-VMJA/VMJAC/VMJACD (Off Us)',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'emailSubject',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Email Subject',
            maxLength: 50,
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
          key: 'dateTimeEndorsedPaymentSolutionsOperations',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Date and Time Endorsed to Payment Solutions Operations',
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileNumberOfTerminals',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Number of Terminals (Count)',
            maxLength: 10,
            type: 'number',
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileBusinessGroup',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Business Group (If applicable)',
            maxLength: 50,
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
          key: 'bdoPayMobileMerchantPortalUserEmailAddress',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Merchant Portal User\'s Email Address',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileMerchantPortalNominatedUsername',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Merchant Portal Nominated Username',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileInternetConnection',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Internet Connection',
            maxLength: 50,
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
          key: 'bdoPayMobileInternetProvider',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Internet Provider',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileReferenceField',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Reference Field',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileRfName',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2) || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – If RF is Customized, pls Include RF Name (Max 10 Characters)',
            maxLength: 50,
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
          key: 'tidIssuedBy',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 3 || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'TID Issued By'
          }
        },
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'dateAndTimeTidIssued',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 3 || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'Date and Time TID Issued'
          }
        },
        /*{
          className: 'flex-1',
          type: 'input',
          key: 'dateAndTimeEndorsedToMAU',
          templateOptions: {
            label: 'Date and Time Endorsed To MAU'
          }
        } */
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'dateTimeAssignedPSProfiling',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Date and Time Assigned to PS Profiling',
          }
        },
        { className: 'flex-2' }
      ]
    },
  ];

  veriScreenFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'calendar',
          key: 'requestPullOutDateForTempPOSTerminals',
          templateOptions: {
            label: 'Request Pull Out Date For Temporary POS Terminals'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'remarksSpecialInstructions',
          templateOptions: {
            label: 'Remarks / Special Instructions (Dispatch-Related Only)'
          }
        },

      ]
    }
  ];

  constructor(private _http: HttpClient) { }

  getPosFields(userGroup): FormlyFieldConfig[] {
    return this.fields;
  }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.posApi + '/' + id);
  }

  create(pos): Observable<any> {
    return this._http.post(ApiConstants.posApi, pos);
  }

  update(id, pos) {
    return this._http.put(ApiConstants.posApi + '/' + id, pos);
  }

  validateByNewAffiliationId(id): Observable<any> {
    return this._http.get(ApiConstants.posApi + '/validate/' + id);
  }
}
