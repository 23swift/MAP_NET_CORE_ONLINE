import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DropDownService } from 'src/app/services/drop-down.service';
import { MidListModalService } from '../mid-list-modal/mid-list-modal.service';
import { FormlyErrorStateMatcher } from '@ngx-formly/material/form-field/formly.error-state-matcher';
import { forEach } from '@angular/router/src/utils/collection';

const apiUrl = '';
@Injectable()
export class MidFormModalService {
  constructor(private _http: HttpClient, private _dropDownService: DropDownService) {
  }

  getFormlyFields() {
    return [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'cardPlans',
            type: 'select',
            templateOptions: {
              label: 'Card Plans / Styles',
              required: true,
              options: this._dropDownService.getDropdown('CP'),
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
            key: 'monitorCode',
            type: 'select',
            templateOptions: {
              label: 'Monitor Code',
              required: true,
              options: this._dropDownService.getDropdown('MC'),
              labelProp: 'value',
              valueProp: 'code',
            },
            lifecycle: {
              onInit: (form, field) => {
                field.formControl.valueChanges.subscribe(v => {
                  if (v === 'MOTO') {
                    form.get('forMoto').patchValue(1);
                  } else {
                    form.get('forMoto').patchValue(undefined);
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
              // 'templateOptions.required': (model: any, formState: any) => {
              //   return model['monitorCode'] === 3;
              // }
            },
            templateOptions: {
              label: 'Default Transaction Source',
              required: true,
              options: this._dropDownService.getDropdown('MTSRC'),
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
            defaultValue: false,
            expressionProperties: {
              // 'templateOptions.required': (model: any, formState: any) => {
              //   return model['monitorCode'] === 2 || model['monitorCode'] === 3;
              // }
            },
            templateOptions: {
              label: 'Major Purchase',
              indeterminate: false
            },
            lifecycle: {
              onInit: (form, field) => {
                field.formControl.valueChanges.subscribe(v => {
                  if (v === true) {
                    form.get('serviceFeeRate').patchValue('99.99');
                    form.get('serviceFeeStraight').patchValue(undefined);
                  } else {
                    form.get('serviceFeeRate').patchValue(undefined);
                    form.get('merchantGroupCode').patchValue(undefined);
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
            defaultValue: 1,
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
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return model['majorPurchase'] || model['serviceFeeRate'] > 0;
              },
              'templateOptions.required': (model: any, formState: any) => {
                return !model['majorPurchase'] && (model['serviceFeeRate'] === '0' || model['serviceFeeRate'] === ''
                || model['serviceFeeRate'] === undefined);
              }
            },
            templateOptions: {
              label: 'Service Fee Contract (Straight)',
              options: this._dropDownService.getDropdown('SFS'),
              labelProp: 'value',
              valueProp: 'code',
            }
          },
          {
            className: 'flex-1',
            key: 'merchantGroupCode',
            type: 'select',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['majorPurchase'];
              },
              'templateOptions.disabled': (model: any, formState: any) => {
                return !model['majorPurchase'];
              }
            },
            templateOptions: {
              label: 'Merchant Group Code (Installment)',
              options: this._dropDownService.getDropdown('MGC'),
              labelProp: 'value',
              valueProp: 'code',
            }
          },
          {
            className: 'flex-1',
            key: 'serviceFeeRate',
            type: 'input',
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return model['majorPurchase'] || (model['serviceFeeStraight'] !== undefined && model['serviceFeeStraight'] !== null);
              },
              'templateOptions.required': (model: any, formState: any) => {
                return model['serviceFeeStraight'] === undefined || model['serviceFeeStraight'] === null;
              }
            },
            templateOptions: {
              label: 'Service Fee Rate',
              pattern: '^\\d{1,2}\\.\\d{2}$|^0$',
              maxLength: 5
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
            key: 'dinersIse',
            type: 'input',
            templateOptions: {
              label: 'Diners ISE',
            }
          },
          {
            className: 'flex-1',
            key: 'payDelayDays',
            type: 'input',
            templateOptions: {
              label: 'Pay Delay Days',
              maxLength: 2
            },
            validators: {
              validation: ['numeric']
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
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return model['majorPurchase'];
              }
            },
            templateOptions: {
              label: 'Merchant Promotions Group',
              options: this._dropDownService.getDropdown('MGPRO'),
              labelProp: 'value',
              valueProp: 'code',
            }
          },
          {
            className: 'flex-1',
            key: 'defaultMpPromotion',
            type: 'select',
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return !model['majorPurchase'];
              },
              'templateOptions.required': (model: any, formState: any) => {
                return model['majorPurchase'];
              }
            },
            templateOptions: {
              label: 'Default MP Promotion',
              options: this._dropDownService.getDropdown('DMPP'),
              labelProp: 'value',
              valueProp: 'code',
            }
          },
          {
            className: 'flex-1',
            key: 'forMoto',
            type: 'radio',
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return model['monitorCode'] !== 'MOTO';
              },
              'templateOptions.required': (model: any, formState: any) => {
                return model['monitorCode'] === 'MOTO';
              }
            },
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
              pattern: '^\\d{1,8}\\.\\d{2}$'
            }
          },
          {
            className: 'flex-1',
            key: 'dccMerchantRebate',
            type: 'input',
            templateOptions: {
              label: 'DCC Merchant Rebate',
              placeholder: '0.00',
              pattern: '^\\d{1,8}\\.\\d{2}$'
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
