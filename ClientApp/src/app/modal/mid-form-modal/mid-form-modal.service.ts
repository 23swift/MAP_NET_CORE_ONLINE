import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const apiUrl = '';
@Injectable()
export class MidFormModalService {
  constructor(private _http: HttpClient) { }

  getFormlyFields() {
    return [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'cardPlans',
            type: 'select',
            defaultValue: 1,
            templateOptions: {
              label: 'Card Plans / Styles',
              required: true,
              options: [
                { value: 1, label: 'MCVCJCACCCDC (CAPTURE ALL)' }
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
            key: 'monitorCode',
            type: 'select',
            templateOptions: {
              label: 'Monitor Code',
              required: true,
              options: [
                { value: 1, label: 'OTC for Straight' },
                { value: 2, label: '0% Installment' },
                { value: 3, label: 'Regular Installment' },
                { value: 4, label: 'BNPL 0%' },
                { value: 5, label: 'BNPL Regular' },
                { value: 6, label: 'BNPL Installment' },
                { value: 7, label: 'MOTO' }
              ]
            },
            lifecycle: {
              onInit: (form, field) => {
                field.formControl.valueChanges.subscribe(v => {
                  if (v === 3 || v === 5) {
                    form.get('merchantGroupCode').patchValue(4);
                  } else if (v === 2 || v === 4) {
                    form.get('merchantGroupCode').patchValue(3);
                  }

                  if (v === 2 || v === 3 || v === 6) {
                    form.get('serviceFeeRate').patchValue('99.99');
                    form.get('majorPurchase').patchValue(true);
                  }

                  if (v === 6) {
                    form.get('merchantPromotionsGroup').patchValue(1);
                    form.get('defaultMpPromotion').patchValue(1);
                  }

                  if (v !== 5) {
                    form.get('status').patchValue(1);
                  }
                });
              }
            }
          },
          {
            className: 'flex-1',
            key: 'defaultTransSrc',
            type: 'select',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['monitorCode'] === 3;
              }
            },
            templateOptions: {
              label: 'Default Transaction Source',
              required: true,
              options: [
                { value: 1, label: 'ECOM' },
                { value: 2, label: 'MOTO' },
                { value: 3, label: 'RPS' },
                { value: 4, label: 'TPP' },
                { value: 5, label: 'Master Merchant' },
                { value: 6, label: 'EMOTO' },
                { value: 7, label: 'ERPS' },
                { value: 8, label: 'N.A.' }
              ]
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            template: '<div class="mat-form-field-infix"><div class="flex-1 mat-subheading-1"><label>Currency:</label></div></div>'
          },
          {
            className: 'flex-1',
            key: 'currencyPhp',
            type: 'checkbox',
            defaultValue: true,
            templateOptions: {
              label: 'PHP',
              indeterminate: false
            }
          },
          {
            className: 'flex-4',
            key: 'currencyUsd',
            type: 'checkbox',
            templateOptions: {
              label: 'USD',
              indeterminate: false
            }
          },
          {
            className: 'flex-1',
            key: 'majorPurchase',
            type: 'checkbox',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['monitorCode'] === 2 || model['monitorCode'] === 3;
              }
            },
            templateOptions: {
              label: 'Major Purchase',
              indeterminate: false
            },
            lifecycle: {
              onInit: (form, field) => {
                field.formControl.valueChanges.subscribe(v => {
                  if (v) {
                    form.get('serviceFeeStraight').patchValue(0);
                  }
                });
              }
            }
          },
          {
            className: 'flex-1',
            key: 'offUs',
            type: 'checkbox',
            templateOptions: {
              label: 'Off US',
              indeterminate: false
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'status',
            type: 'select',
            expressionProperties: {
            },
            templateOptions: {
              label: 'Status',
              required: true,
              options: [
                { value: 1, label: 'Active' },
                { value: 2, label: 'Inactive' }
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
            key: 'cupAcceptorId',
            type: 'input',
            templateOptions: {
              label: 'CUP Acceptor ID',
              // required: true,
              disabled: true
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'serviceFeeStraight',
            type: 'select',
            defaultValue: 0,
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return model['majorPurchase'];
              },
              'templateOptions.required': (model: any, formState: any) => {
                return model['serviceFeeRate'] === 0;
              }
            },
            templateOptions: {
              label: 'Service Fee Contract (Straight)',
              options: [
                { value: 0, label: 'Select Service Fee Contract' },
                { value: 1, label: 'SFR1' },
                { value: 2, label: 'SFR2' }
              ]
            }
          },
          {
            className: 'flex-1',
            key: 'merchantGroupCode',
            type: 'select',
            defaultValue: 0,
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['monitorCode'] === 3;
              }
            },
            templateOptions: {
              label: 'Merchant Group Code (Installment)',
              options: [
                { value: 0, label: 'Select Merchant Group Code' },
                { value: 1, label: 'DM01 - Diners' },
                { value: 2, label: 'MerchGrp24' },
                { value: 3, label: '1Z' },
                { value: 4, label: '4' }
              ]
            }
          },
          {
            className: 'flex-1',
            key: 'serviceFeeRate',
            type: 'input',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['merchantGroupCode'] === 0 || model['serviceFeeStraight'] === 0;
              }
            },
            templateOptions: {
              label: 'Service Fee Rate',
              pattern: '^\\d{1,2}\.\\d{2}$',
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'amexMna',
            type: 'checkbox',
            templateOptions: {
              label: 'Amex MNA',
              indeterminate: false
            }
          },
          {
            className: 'flex-1',
            key: 'intesCode',
            type: 'input',
            templateOptions: {
              label: 'INTES Code',
            }
          },
          {
            className: 'flex-1',
            key: 'payDelayDays',
            type: 'input',
            templateOptions: {
              label: 'Pay Delay Days',
              pattern: '^\\d+$',
              maxLength: 2
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'merchantPromotionsGroup',
            type: 'select',
            defaultValue: 0,
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['monitorCode'] === 2 || model['monitorCode'] === 3 || model['monitorCode'] === 6;
              }
            },
            templateOptions: {
              label: 'Merchant Promotions Group',
              options: [
                { value: 0, label: 'Select Promotions Group' },
                { value: 1, label: 'BNPL Flagship' },
                { value: 2, label: 'Installament Reg' }
              ]
            }
          },
          {
            className: 'flex-1',
            key: 'defaultMpPromotion',
            type: 'select',
            defaultValue: 1,
            templateOptions: {
              label: 'Default MP Promotion',
              required: true,
              options: [
                { value: 1, label: 'BNPL Flagship' },
                { value: 2, label: 'Installament Reg' }
              ]
            }
          },
          {
            className: 'flex-1',
            key: 'forMoto',
            type: 'radio',
            defaultValue: 1,
            templateOptions: {
              label: 'For MOTO',
              options: [
                { value: 1, label: 'Manual' },
                { value: 2, label: 'Key-In' },
                { value: 3, label: 'eMOTO' }
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
            key: 'dccMarkupRate',
            type: 'input',
            templateOptions: {
              label: 'DCC Mark-up Rate',
              placeholder: '0.00',
              type: 'number',
              pattern: '^\\d{1,8}\.\\d{2}$'
            }
          },
          {
            className: 'flex-1',
            key: 'dccMerchantRebate',
            type: 'input',
            templateOptions: {
              label: 'DCC Merchant Rebate',
              placeholder: '0.00',
              type: 'number',
              pattern: '^\\d{1,8}\.\\d{2}$'
            }
          }
        ]
      }
    ];
  }

  getById() {
    return this._http.get(apiUrl);
  }

  create(mid): Observable<any> {
    return this._http.post(ApiConstants.midApi, mid);
  }

  update(id, mid): Observable<any> {
    return this._http.put(ApiConstants.midApi + '/' + id, mid);
  }
}
