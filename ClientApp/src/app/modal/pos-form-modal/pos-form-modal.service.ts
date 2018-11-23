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
          type: 'select',
          key: 'natureOfRequest',
          templateOptions: {
            label: 'Nature Of Request',
            required: true,
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
              return model['natureOfRequest'] !== 2;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 2;
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
          templateOptions: {
            label: 'Requester\'s Name',
            required: true,
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'requestersBusinessUnit',
          templateOptions: {
            label: 'Requester\'s Business Unit',
            required: true,
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'requestersContactNumber',
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
              return model['natureOfRequest'] !== 1;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1;
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
              return model['natureOfRequest'] !== 1;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1;
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
              return model['natureOfRequest'] !== 1;
            }
          },
          templateOptions: {
            label: 'Business Type Of Account (AO / RM / HO)',
            required: true,
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2;
            }
          },
          templateOptions: {
            label: 'Business Unit (AO\'s Business Unit)',
            options: [
              {label: 'Select Business Unit', value: 0}
            ]
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'segment',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2;
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
              return model['natureOfRequest'] !== 1;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1;
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
          templateOptions: {
            label: 'Merchant\'s Legal Name',
            required: true,
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'merchantDBAName',
          templateOptions: {
            label: 'Merchant\'s DBA Name',
            required: true,
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
              return model['natureOfRequest'] !== 1;
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
          templateOptions: {
            label: 'Merchant\'s DBA Address',
            required: true,
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'merchantDbaAddressOld',
          templateOptions: {
            label: 'Merchant\'s DBA Address (old)',
            required: true,
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
          templateOptions: {
            label: 'Merchant\'s DBA City',
            required: true,
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
            }
          },
          templateOptions: {
            label: 'Contactless Merchant?',
            required: true,
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
          templateOptions: {
            label: 'Merchant Category Code (MCC)',
            required: true,
            type: 'number'
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'nsp',
          templateOptions: {
            label: 'NSP',
            required: true,
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'contactPerson',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2;
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
          templateOptions: {
            label: 'Reason For 3 Slips Printing',
            required: true,
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
          key: 'requiredDateAndTimeOfDispatch',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 || model['natureOfRequest'] !== 2;
            }
          },
          templateOptions: {
            label: 'Required Date and Time of Dispatch',
            required: true,
          }
        },
        {
          className: 'flex-1',
          type: 'radio',
          key: 'isInstallationTerm',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1;
            }
          },
          templateOptions: {
            label: 'Installation Term',
            required: true,
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
              return model['natureOfRequest'] !== 1;
            }
          },
          templateOptions: {
            label: 'Required Pull Out Date For Temporary POS Terminals',
            required: true,
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
              return model['natureOfRequest'] !== 1;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 1 || model['natureOfRequest'] === 2;
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
              return model['natureOfRequest'] !== 1 || model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 2;
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
          templateOptions: {
            label: 'Credit Straight TID (new)',
            required: true,
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
          templateOptions: {
            label: 'Date and Time Endorsed To MAU',
            required: true,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'creditStraightMidVmjaVmjacd',
          templateOptions: {
            label: 'Credit Straight MID-VMJA/VMJACD',
            required: true,
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'creditStraightMidVmj',
          templateOptions: {
            label: 'Credit Straight MID-VMJ',
            required: true,
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
          templateOptions: {
            label: 'Credit Straight MID-AMEX (If with VMJ)',
            required: true,
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'dinersMID',
          templateOptions: {
            label: 'Credit Straight MID-Diners (If with VMJ)',
            required: true,
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'cupAcceptorId',
          templateOptions: {
            label: 'CUP Acceptor ID',
            required: true,
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
          templateOptions: {
            label: 'Credit Straight MID-VMJA/VMJAC/VMJACD',
            required: true,
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
              return model['natureOfRequest'] !== 2 && model['natureOfRequest'] !== 3;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 2 || model['natureOfRequest'] === 3;
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
              return model['natureOfRequest'] !== 2 && model['natureOfRequest'] !== 3;
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 2 || model['natureOfRequest'] === 3;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
          templateOptions: {
            label: 'Date and Time Endorsed to Payment Solutions Operations',
            required: true,
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileNumberOfTerminals',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 1 && model['natureOfRequest'] !== 2;
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
              return model['natureOfRequest'] !== 3;
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
              return model['natureOfRequest'] !== 3;
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
          templateOptions: {
            label: 'Date and Time Assigned to PS Profiling',
            required: true,
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
}
