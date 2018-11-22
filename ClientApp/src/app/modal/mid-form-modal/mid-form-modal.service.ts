import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';

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
                { value: 6, label: 'MOTO' }
              ]
            },
            lifecycle: {
              onInit: (form, field) => {
                field.formControl.valueChanges.subscribe(v => {
                  if (v === 3 || v === 5) {
                    field.model['merchantGroupCode'].setValue(4);
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
            }
          },
          {
            className: 'flex-4',
            key: 'currencyUsd',
            type: 'checkbox',
            templateOptions: {
              label: 'USD',
            }
          },
          {
            className: 'flex-1',
            key: 'majorPurchase',
            type: 'checkbox',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['monitorCode'] === 3;
              }
            },
            templateOptions: {
              label: 'Major Purchase'
            }
          },
          {
            className: 'flex-1',
            key: 'offUs',
            type: 'checkbox',
            templateOptions: {
              label: 'Off US'
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
              'defaultValue': (model: any, formState: any) => {
                return model['monitorCode'] !== 5 ? 1 : 0;
              }
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
              required: true,
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
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                if (model['majorPurchase']) {
                  model['serviceFeeStraight'] = undefined;
                }
                return model['majorPurchase'];
              },
              'templateOptions.required': (model: any, formState: any) => {
                return model['serviceFeeRate'] === undefined;
              }
            },
            templateOptions: {
              label: 'Service Fee Contract (Straight)',
              options: [
                { value: 1, label: 'SFR1' },
                { value: 2, label: 'SFR2' }
              ]
            }
          },
          {
            className: 'flex-1',
            key: 'merchantGroupCode',
            type: 'select',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['monitorCode'] === 3;
              }
            },
            templateOptions: {
              label: 'Merchant Group Code (Installment)',
              options: [
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
                return model['merchantGroupCode'] === undefined || model['serviceFeeStraight'] === undefined;
              }
            },
            templateOptions: {
              label: 'Service Fee Rate',
              pattern: '^(\\d{1,2})\.\\d{2}$',
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
              label: 'Amex MNA'
            }
          },
          {
            className: 'flex-1',
            key: 'defaultMpPromotion',
            type: 'checkbox',
            templateOptions: {
              label: 'Diners ISE',
            }
          },
          {
            className: 'flex-1',
            key: 'defaultMpPromotion',
            type: 'input',
            defaultValue: 1,
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
            key: 'merchantPromotionGroup',
            type: 'select',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['monitorCode'] === 4 || model['monitorCode'] === 5;
              },
              'defaultValue': (model: any, formState: any) => {
                return model['monitorCode'] === 4 ? 1 : 0;
              }
            },
            templateOptions: {
              label: 'Merchant Promotions Group',
              options: [
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
            defaultValue: 1,
            templateOptions: {
              label: 'DCC Mark-up Rate'
            }
          },
          {
            className: 'flex-1',
            key: 'dccMerchantRebate',
            type: 'input',
            templateOptions: {
              label: 'DCC Merchant Rebate'
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
