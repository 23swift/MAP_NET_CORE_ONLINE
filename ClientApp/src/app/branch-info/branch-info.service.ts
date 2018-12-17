import { Injectable } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from 'src/app/services/drop-down.service';

@Injectable({
  providedIn: 'root'
})
export class BranchInfoService {


//#region veriScreen field
veriScreen: FormlyFieldConfig[] = [
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
      }
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'dbaAddress1',
      templateOptions: {
        label: 'DBA(Branch/Outlet Address )',
        placeholder: 'DBA(Branch/Outlet Address )',
        required: true,
        maxLength: 30
      },
    }]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'dbaAddress2',
      templateOptions: {
        maxLength: 30
      },
    }]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'dbaAddress3',
      templateOptions: {
        maxLength: 30
      }
    }]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'dbaAddress4',
      templateOptions: {
        maxLength: 30
      }
    }]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'select',
      key: 'dbaCity',
      templateOptions: {
        label: 'DBA City',
        options: this._dropDownService.getDropdown('CY'),
        labelProp: 'value',
        valueProp: 'code',
        required: true
      }
    },
    {
      className: 'flex-1',
      type: 'select',
      key: 'dbaZipCode',
      templateOptions: {
        label: 'Zipcode',
        options: this._dropDownService.getDropdown('ZC'),
        labelProp: 'value',
        valueProp: 'code',
        required: true
      }
    },
    {
      className: 'flex-1',//dropdown
      type: 'select',
      key: 'areaMallCode',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Area Mall Code',
        options: this._dropDownService.getDropdown('AMC'),
        labelProp: 'value',
        valueProp: 'code'
      }
    }
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
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
    }]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'branchEmailAddress',
      templateOptions: {
        label: 'E-Mail Address',
        placeholder: 'E-Mail Address'
      }
    },
    {
      className: 'flex-1',
      type: 'input',
      key: 'branchWebsite',
      templateOptions: {
        label: 'Website',
        placeholder: 'Website'
      }
    }]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'settleAccountNumber',
        templateOptions: {
          label: 'Settle Account Number (For Crediting Payment)',
          placeholder: 'Settle Account Number (For Crediting Payment)',
          maxLength: 20
        }
      },
      {
        className: 'flex-1',
        type: 'select',
        key: 'taxCode',
        templateOptions: {
          label: 'Tax Code',
          options: this._dropDownService.getDropdown('TC'),
          labelProp: 'value',
          valueProp: 'code',
          required: true
        }
      }
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        template: '<span class="mat-subheading-1">Tax Exempt Validity(mm/dd/yyyy):</span>',
      },
      {
        className: 'flex-1 mat-form-field-infix',
        type: 'calendar',
        key: 'taxExemptValidityFrom',
        templateOptions: {
          label: 'Date From',
          placeholder: 'Date From'
        }
      },
      {
        className: 'flex-1 mat-form-field-infix',
        type: 'calendar',
        key: 'taxExemptValidityTo',
        templateOptions: {
          label: 'Date To',
          placeholder: 'Date To'
        }
      }
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'taxExemptCertIssuedBy',
      expressionProperties: {
       // 'templateOptions.required': (model: any, formState: any) => {

       //   return model['taxCode'] == '2';
       // }
      },
      templateOptions: {
        label: 'Tax Exempt Certificate Issued By',
        placeholder: 'Tax Exempt Certificate Issued By',
        maxLength: 20
      },
    },
    {
      className: 'flex-1',
      type: 'input',
      key: 'taxExemptClass',
      expressionProperties: {
      //  'templateOptions.required': (model: any, formState: any) => {

      //    return model['taxCode'] == '2';
      //  }
      },
      templateOptions: {
        label: 'Tax Exempt Classification',
        placeholder: 'Tax Exempt Classification',
        maxLength: 30
      }
    },
    {
      className: 'flex-1',
      type: 'input',
      key: 'tin',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Tax Identification Number (TIN)',
        placeholder: 'Tax Identification Number (TIN)',
        required: true,
        //pattern: '^\d{15}$',
        maxLength: 15,          
      }
    }
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'specialMailingAdd1',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Special Mailing Address',
        placeholder: 'Special Mailing Address',
        maxLength: 30
      },
    },
    ]
  },

  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'specialMailingAdd2',
      expressionProperties: {

      },
      templateOptions: {
        maxLength: 30
      },
    },
    ]
  },

  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'specialMailingAdd3',
      expressionProperties: {

      },
      templateOptions: {
        maxLength: 30
      },
    },
    ]
  },

  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'specialMailingAdd4',
      expressionProperties: {

      },
      templateOptions: {
        maxLength: 30
      },
    },
    ]
  },
  //dropdown
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'select',
      key: 'specialMailingCity',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Special Mailing Address City',
        options: this._dropDownService.getDropdown('CY'),
        labelProp: 'value',
        valueProp: 'code',
      },
    },
    {
      className: 'flex-1',
      type: 'select',
      key: 'specialMailingZipCode',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Special Mailing Address ZipCode',
        options: this._dropDownService.getDropdown('ZC'),
        labelProp: 'value',
        valueProp: 'code',
      }
    }
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'settlementAccNoForDebit',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Settlement Account Number for Debit Facility(If CTA)',
        placeholder: 'Settlement Account Number for Debit Facility(If CTA)',
        //pattern: '^\d{20}$',
        maxLength: 20
      }
    },
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'storeId',
        templateOptions: {
          label: 'Store ID',
          placeholder: 'Store ID',
          //pattern: '^\d+$'
        },
        validators: {
          validation: ['numeric'],
        }
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'merchantNumber',
        templateOptions: {
          label: 'Merchant Number',
          placeholder: 'Merchant Number'
        },
        validators: {
          validation: ['numeric'],
        }
      }
    ]
  },
/*  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'smShopCard',
      templateOptions: {
        label: 'SM Shop Card',
        placeholder: 'SM Shop Card',
        pattern: '^\\d+\\.\\d{2}$',
        maxLength: 4
      }
    },
    {
      className: 'flex-1',
      type: 'input',
      key: 'smGiftCard',
      templateOptions: {
        label: 'SM Gift Card',
        placeholder: 'SM Gift Card',
        pattern: '^\\d+\\.\\d{2}$',
        maxLength: 4
      }
    } 
    ]
  }, */
  //*
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [/*{
      className: 'flex-1',
      type: 'input',
      key: 'forMoto',
      templateOptions: {
        label: 'For Moto',
        placeholder: 'For Moto',
        disabled: true
      }
    },*/
    {
      className: 'flex-1',
      type: 'select',
      key: 'bdoPayRating',
      templateOptions: {
        label: 'BDO Pay Rating',
        options: [],
        labelProp: 'value',
        valueProp: 'code',
      },
      lifecycle: {
        onInit: (form, field) => {
          field.templateOptions.options = this._dropDownService.getDropdown('BPR');
        }
      }
    }
    ]
  },

/*    {
    template: '<span class="mat-headline">Cash Agad Facility Instructions</span>',
  },

  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'nameAuthorizedSoaRecip',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Name of Authorized SOA Recipient',
        placeholder: 'Name of Authorized SOA Recipient',
        maxLength: 120
      }
    },
    {
      className: 'flex-1',
      type: 'input',
      key: 'soaEmailAddress',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Email Address',
        placeholder: 'Email Address',
        maxLength: 250
      }
    },
    {
      className: 'flex-1',
      key: 'reportDistribution',
      type: 'radio',
      templateOptions: {
        label: 'Report Distribution?',
        options: [
          { value: '1', label: 'Per Company' },
          { value: '2', label: "Per Company's Branch" }
        ],
      },

    },
    ]
  },
*/
/*
  {
    template: '<span class="mat-headline">Principal Details (Required For Single Proprietorship)</span>',
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'ownerName',
      expressionProperties: {

      },
      templateOptions: {
        label: "Owner's Name",
        placeholder: "Owner's Name",
        required: true
      },
    },
    {
      className: 'flex-1',
      type: 'calendar',
      key: 'ownerBirthday',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Date of Birth (mm/dd/yyyy)',
        placeholder: 'Date of Birth (mm/dd/yyyy)'
      }
    },
    {
      className: 'flex-1',
      type: 'input',
      key: 'spouseName',
      expressionProperties: {

      },
      templateOptions: {
        label: "Spouse's Name",
        placeholder: "Spouse's Name"
      }
    },
    ]
  }, */
  {
    template: '<span class="mat-headline">Other Details</span>',
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
  {
      className: 'flex-1',
      type: 'checkbox',
      key: 'isAtmDebit',
      templateOptions: {
        label: 'ATM/Debit',
        indeterminate: false
      },
      lifecycle: {
        onInit: (form, field) => {
          field.formControl.valueChanges.subscribe(v => {
            if (!v) {
              form.get('numberOfDebitTidAtm').patchValue(undefined);
              form.get('mdrAtm').patchValue(undefined);
            }
          });
        }
      }
    },
    {
      key: 'numberOfDebitTidAtm',
      className: 'flex-3',
      type: 'input',
      expressionProperties: {
        'templateOptions.required': (model: any, formState: any) => {
          return model['isAtmDebit'];
        },
        'templateOptions.disabled': (model: any, formState: any) => {
          return !model['isAtmDebit'];
        }
      },
      templateOptions: {
        label: 'No. of Debit TIDs',
        maxLength: 3,
      },
      validators: {
        validation: ['numeric'],
      }
    },
    {
      key: 'mdrAtm',
      className: 'flex-3',
      type: 'input',
      expressionProperties: {
        'templateOptions.required': (model: any, formState: any) => {
          return model['isAtmDebit'];
        },
        'templateOptions.disabled': (model: any, formState: any) => {
          return !model['isAtmDebit'];
        }
      },
      templateOptions: {
        label: 'MDR',
        pattern: '^\\d{1,4}\\.\\d{2}$'
      }
    },
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'checkbox',
      key: 'isSmGiftCard',
      templateOptions: {
        label: 'SM Gift Card',
        indeterminate: false
      },
      lifecycle: {
        onInit: (form, field) => {
          field.formControl.valueChanges.subscribe(v => {
            if (!v) {
              form.get('mdrSmGiftCard').patchValue(undefined);
            }
          });
        }
      }
    },
    {
      key: 'mdrSmGiftCard',
      className: 'flex-6',
      type: 'input',
      expressionProperties: {
        'templateOptions.required': (model: any, formState: any) => {
          return model['isSmGiftCard'];
        },
        'templateOptions.disabled': (model: any, formState: any) => {
          return !model['isSmGiftCard'];
        }
      },
      templateOptions: {
        label: 'MDR',
        pattern: '^\\d{1,4}\\.\\d{2}$'
      }
    }
    ]
  },
{
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'checkbox',
      key: 'isSmShopCard',
      templateOptions: {
        label: 'SM Shop Card',
        indeterminate: false
      },
      lifecycle: {
        onInit: (form, field) => {
          field.formControl.valueChanges.subscribe(v => {
            if (!v) {
              form.get('mdrSmShopCard').patchValue(undefined);
            }
          });
        }
      }
    },
    {
      key: 'mdrSmShopCard',
      className: 'flex-6',
      type: 'input',
      expressionProperties: {
        'templateOptions.required': (model: any, formState: any) => {
          return model['isSmShopCard'];
        },
        'templateOptions.disabled': (model: any, formState: any) => {
          return !model['isSmShopCard'];
        }
      },
      templateOptions: {
        label: 'MDR',
        pattern: '^\\d{1,4}\\.\\d{2}$'
      }
    }
    ]
  },
    {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'checkbox',
      key: 'isCashAgad',
      templateOptions: {
        label: 'Cash Agad',
        indeterminate: false
      },
      lifecycle: {
        onInit: (form, field) => {
          field.formControl.valueChanges.subscribe(v => {
            if (!v) {
              form.get('numberOfDebitTidCashAgad').patchValue(undefined);
              form.get('mdrCashAgad').patchValue(undefined);
            }
          });
        }
      }
    },
    {
      key: 'mdrCashAgad',
      className: 'flex-3',
      type: 'input',
      expressionProperties: {
        'templateOptions.required': (model: any, formState: any) => {
          return model['isCashAgad'];
        },
        'templateOptions.disabled': (model: any, formState: any) => {
          return !model['isCashAgad'];
        }
      },
      templateOptions: {
        label: 'MDR',
        pattern: '^\\d{1,4}\\.\\d{2}$'
      }
    }
    ]
  },

  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [  //conditional mandatory
      {
        className: 'flex-1', //dropdown
        type: 'select',
        key: 'mcc',
        expressionProperties: {

        },
        templateOptions: {
          label: 'MCC',
          options: this._dropDownService.getDropdown('MCC'),
          labelProp: 'value',
          valueProp: 'code',
          required: true
        }
      },
      {
        className: 'flex-1',  //decimal format   //conditional mandatory
        type: 'input',
        key: 'IntesCodeForDiners',
        expressionProperties: {

        },
        templateOptions: {
          label: 'INTES Code for Diners',
          placeholder: 'INTES Code for Diners',
          maxLength: 4
        },
        validators: {
          validation: ['numeric'],
        }
      }
    ]
  },
  {
    fieldGroupClassName: 'display-flex', //conditional mandatory
    fieldGroup: [
      {
        className: 'flex-1', // not yet
        type: 'input',
        key: 'tppOnly',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Fee Account(TPP Only)',
          placeholder: '(TPP Only)',
          maxLength:20
        }
      },
      {
        className: 'flex-1',
        type: 'select',
        key: 'strategicMerchant',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Strategic Merchant',
          options: this._dropDownService.getDropdown('SM'),
          labelProp: 'value',
          valueProp: 'code',
        },
      }
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'mcAssignedId',
        expressionProperties: {

        },
        templateOptions: {
          label: 'MC Assigned Id',
          placeholder: 'MC Assigned Id',
          maxLength: 6
        }
      },
      {
        className: 'flex-1',
        type: 'select',
        key: 'amexRiskIndicator',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Amex Risk Indicator',
          options: [],
          labelProp: 'value',
          valueProp: 'code',
        },
        lifecycle: {
          onInit: (form, field) => {
            field.templateOptions.options = this._dropDownService.getDropdown('ARI');
          }
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
        key: 'imprinterNumber',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Imprinter Number(Sales Slip Handling)',
          placeholder: 'Imprinter Number(Sales Slip Handling)',
          maxLength: 10
        }
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'imprinterAmex',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Imprinter AMEX (MID Capping)',
          placeholder: 'Imprinter AMEX (MID Capping)',
          maxLength: 13
        }
      }
    ]
  },


  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [{
      className: 'flex-1',
      type: 'input',
      key: 'imprinterDc',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Imprinter DC (Top Corporation/Ecom)',
        placeholder: 'Imprinter DC (Top Corporation/Ecom)',
        maxLength: 13
      }
    },
    {
      className: 'flex-1',
      type: 'input',
      key: 'imprinterOthers',
      expressionProperties: {

      },
      templateOptions: {
        label: 'Imprinter Others(Class Code)',
        placeholder: 'Imprinter Others(Class Code)',
        maxLength: 12
      }
    },
    ]
  },

  { // numeric
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'holdOutAccountNumber',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Hold-out Account Number',
          placeholder: 'Hold-out Account Number',
          maxLength: 20
        }
      },
      { //numeric
        className: 'flex-1',
        type: 'input',
        key: 'holdOutAmount',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Hold-out Amount',
          placeholder: 'Hold-out Amount',
          maxLength: 19
        },
        validators: {
          validation: ['numeric'],
        }
      }
    ]
  },

  { //numeric
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'otherDetailsRemarks',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Remarks',
          placeholder: 'Remarks'
        }
      }
    ]
  },

  { template: '<span class="mat-headline">ECOM (ADMRC Fields)</span>' },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'fraudToolProvider',
        templateOptions: {
          label: 'Fraud Tool Provider',
          options: [],
          labelProp: 'value',
          valueProp: 'code',
        },
        lifecycle: {
          onInit: (form, field) => {
            field.templateOptions.options = this._dropDownService.getDropdown('FTPID');
          }
        }
      },
      {
        className: 'flex-1',
        type: 'checkbox',
        key: 'directPaymentLink',
        templateOptions: {
          label: 'Direct Payment Link',
          indeterminate: false
        }
      },
      {
        className: 'flex-1',
        type: 'select',
        key: 'gatewayIntegrationType',
        templateOptions: {
          label: 'Gateway Integration Type',
          options: [],
          labelProp: 'value',
          valueProp: 'code',
        },
        lifecycle: {
          onInit: (form, field) => {
            field.templateOptions.options = this._dropDownService.getDropdown('GIT');
          }
        },
      }
    ]
  },
];
//#endregion 



  constructor(private _http: HttpClient, private _dropDownService: DropDownService) {    
  }
  getBranchFields(): FormlyFieldConfig[] {


    return this.veriScreen;
  }
}
