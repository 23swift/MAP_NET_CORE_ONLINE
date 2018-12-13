import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from 'src/app/services/drop-down.service';
import { AoListModalService } from '../ao-list-modal/ao-list-modal.service';

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
            options: this._dropDownService.getDropdown('NR'),
            labelProp: 'value',
            valueProp: 'code',
          },
          lifecycle: {
            onInit: (form, field) => {
              field.formControl.valueChanges.subscribe(v => {
                if (v === 'Installation') {
                  form.get('numberOfPrintedSlips').patchValue(undefined);
                  form.get('merchantDbaAddressOld').patchValue(undefined);
                  form.get('dateTimeEndorsedPaymentSolutionsOperations').patchValue(undefined);
                } else if (v === 'TID Issuance') {
                  form.get('numberOfPrintedSlips').patchValue('2');
                  form.get('area').patchValue(undefined);
                  form.get('businessTypeOfAccount').patchValue(undefined);
                  form.get('businessUnitAO').patchValue(undefined);
                  form.get('segment').patchValue(undefined);
                  form.get('merchantNameOnSignage').patchValue(undefined);
                  form.get('merchantDbaAddressOld').patchValue(undefined);
                  form.get('isContactlessMerchant').patchValue(undefined);
                  form.get('contactPerson').patchValue(undefined);
                  form.get('contactNumber').patchValue(undefined);
                  form.get('numberOfPrintedSlips').patchValue(undefined);
                  form.get('reasonForThreeSlipsPrinting').patchValue(undefined);
                  form.get('requiredDateAndTimeOfDispatch').patchValue(undefined);
                  form.get('isInstallationTerm').patchValue(undefined);
                  form.get('requiredPullOutDateForTempPOSTerminals').patchValue(undefined);
                  form.get('reasonForPermanentGPRSInstallation').patchValue(undefined);
                  form.get('otherRequiredProfilingFacility').patchValue(undefined);
                  form.get('mustSettle').patchValue(undefined);
                  form.get('remarksSpecialInstructions').patchValue(undefined);
                  form.get('merchantLoyalty').patchValue(undefined);
                  form.get('merchantPrepaid').patchValue(undefined);
                  form.get('bdoPayMobileNumberOfTerminals').patchValue(undefined);
                  form.get('bdoPayMobileBusinessGroup').patchValue(undefined);
                  form.get('bdoPayMobileMerchantPortalUserEmailAddress').patchValue(undefined);
                  form.get('bdoPayMobileMerchantPortalNominatedUsername').patchValue(undefined);
                  form.get('bdoPayMobileInternetConnection').patchValue(undefined);
                  form.get('bdoPayMobileInternetProvider').patchValue(undefined);
                  form.get('bdoPayMobileReferenceField').patchValue(undefined);
                  form.get('bdoPayMobileRfName').patchValue(undefined);
                } else {
                  form.get('area').patchValue(undefined);
                  form.get('businessTypeOfAccount').patchValue(undefined);
                  form.get('businessUnitAO').patchValue(undefined);
                  form.get('segment').patchValue(undefined);
                  form.get('approvedBy').patchValue(undefined);
                  form.get('merchantNameOnSignage').patchValue(undefined);
                  form.get('isInstallationTerm').patchValue(undefined);
                  form.get('requiredPullOutDateForTempPOSTerminals').patchValue(undefined);
                  form.get('reasonForPermanentGPRSInstallation').patchValue(undefined);
                  form.get('dateTimeEndorsedPaymentSolutionsOperations').patchValue(undefined);
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
              return model['natureOfRequest'] === 'TID Issuance' ||
              model['natureOfRequest'] === 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 'TID Issuance' ||
              model['natureOfRequest'] !== 'Installation' && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Reprogramming Type',
            options: this._dropDownService.getDropdown('RPT'),
            labelProp: 'value',
            valueProp: 'code',
          }
        },
        /*  {
            className: 'flex-1',
            type: 'select',
            key: 'tidIssuanceType',
            defaultValue: 0,
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return model['natureOfRequest'] !== 'TID Issuance';
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
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 'Installation' && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Business Unit / Area (where POS will be charged)',
            options: this._dropDownService.getDropdown('MALLS'),
            labelProp: 'value',
            valueProp: 'code',
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'accountOfficerHandler',
          defaultValue: 0,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 'Installation' && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Account Officer / Handler',
            options: this._aoListService.getAoList(),
            labelProp: 'lastName',
            valueProp: 'lastName',
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'businessTypeOfAccount',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Business Type Of Account (AO / RM / HO)',
            options: this._dropDownService.getDropdown('BTOA'),
            labelProp: 'value',
            valueProp: 'code',
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
              return model['natureOfRequest'] === 'TID Issuance' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'TID Issuance' && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Business Unit (AO\'s Business Unit)',
            options: this._dropDownService.getDropdown('ABU'),
            labelProp: 'value',
            valueProp: 'code',
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'segment',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] === 'TID Issuance' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'TID Issuance' || model['isWaved'] === false;
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
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 'Installation' && model['isWaved'] === false;
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
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
            maxLength: 4
          },
          validators: {
            validation: ['numeric'],
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'TID Issuance' || model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Number of Printed Slips',
            maxLength: 10,
          },
          validators: {
            validation: ['numeric'],
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
              return (model['natureOfRequest'] !== 'TID Issuance') || model['isWaved'];
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
         /*   'templateOptions.disabled': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] === false;
            } */
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
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
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
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 'Installation' && model['isWaved'] === false;
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'TID Issuance' && model['isWaved'] === false;
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'TID Issuance' && model['isWaved'] === false;
            }
          },
          templateOptions: {
            label: 'Must Settle (No. of Days Required)',
            options: this._dropDownService.getDropdown('MS'),
            labelProp: 'value',
            valueProp: 'code',
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
              return model['natureOfRequest'] === 'TID Issuance' || model['isWaved'];
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
              return model['natureOfRequest'] === 'Installation' || model['natureOfRequest'] === 'TID Issuance' || model['isWaved'];
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
              return (model['natureOfRequest'] === 'Installation') || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return (model['natureOfRequest'] !== 'Installation') && model['isWaved'] === false;
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
              return model['natureOfRequest'] === 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] !== 'Installation' && model['isWaved'] === false;
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Number of Terminals (Count)',
            maxLength: 10,
          },
          validators: {
            validation: ['numeric'],
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileBusinessGroup',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Merchant Portal Nominated Username',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'bdoPayMobileInternetConnection',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Internet Connection',
            options: this._dropDownService.getDropdown('BPMIC'),
            labelProp: 'value',
            valueProp: 'code',
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
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Internet Provider',
            maxLength: 50,
          }
        },
        {
          className: 'flex-1',
          type: 'select',
          key: 'bdoPayMobileReferenceField',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
            }
          },
          templateOptions: {
            label: 'BDO Pay Mobile – Reference Field',
            options: this._dropDownService.getDropdown('NR'),
            labelProp: 'value',
            valueProp: 'code',
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'bdoPayMobileRfName',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['natureOfRequest'] === 'TID Issuance') || model['isWaved'];
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
              return model['natureOfRequest'] !== 'TID Issuance' || model['isWaved'];
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
              return model['natureOfRequest'] !== 'TID Issuance' || model['isWaved'];
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
              return model['natureOfRequest'] !== 'Installation' || model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return model['natureOfRequest'] === 'Installation' && model['isWaved'] === false;
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

  constructor(private _http: HttpClient, private _dropDownService: DropDownService,
    private _aoListService: AoListModalService) { }

  getPosFields(userGroup): FormlyFieldConfig[] {
    if(userGroup === 'mauEncoder')
    {
    return this.veriScreenFields;
    }
    else
    {
    return this.fields;
     }
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
