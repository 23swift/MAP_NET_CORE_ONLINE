import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DropDownService } from 'src/app/services/drop-down.service';
import { rootRenderNodes } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class PrintDebitModalService {
  main: FormlyFieldConfig[] = [
    {
      template: '<span class="mat-headline">Debit Facility Instructions</span>',
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: 'settlementAccNoForDebit',
          templateOptions: {
            label: 'Settlement Account Number for Debit Facility(If CTA)',
            placeholder: 'Settlement Account Number for Debit Facility(If CTA)',
            maxLength: 20,
            disabled: true
          },
          validators: {
            validation: ['numeric'],
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'payeesName',
          templateOptions: {
            label: 'Payees Name(if check payment)',
            placeholder: 'Payees Name(if check payment)',
            maxLength: 50,
            disabled: true
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'emailAddressForReportDist',
          templateOptions: {
            label: 'Email Address For Report Distribution',
            placeholder: 'Email Address For Report Distribution',
            disabled: true
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'mailingAddressForPaymentDel',
          templateOptions: {
            label: 'Mailing Address for Payment Delivery and Other Reports',
            placeholder: 'Mailing Address for Payment Delivery and Other Reports',
            disabled: true
          }
        },
        
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [{
        className: 'flex-1',
        type: 'select',
        key: 'reportSetting',
        templateOptions: {
          label: 'Report Setting',
          placeholder: 'Report Setting',
          options: [{
            value: 1, label: 'E-MAIL'
          },
          {
            value: 2, label: 'PRINT'
          }],
          disabled: true
        }
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'emailAddressForReportSetting',
        expressionProperties: {
        },
        templateOptions: {
          label: 'Email Address for Report Setting',
          placeholder: 'Email Address for Report Setting',
          disabled: true
        }
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'storeId',
        templateOptions: {
          label: 'Store ID',
          placeholder: 'Store ID',
          disabled: true
        }
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'debitFacilityRemarks',
        templateOptions: {
          label: 'Remarks',
          placeholder: 'Remarks',
          disabled: true
        }
      }
      ]
    },
  ]

  constructor() { }

}
