import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { DropDownService } from 'src/app/services/drop-down.service';

@Injectable()
export class PosTerminalFormModalService {

  constructor(private _http: HttpClient, private _dropDownService: DropDownService) { }

  getPosTerminalFields(): FormlyFieldConfig[] {
    return [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            type: 'select',
            key: 'terminalBrand',
            templateOptions: {
              label: 'Terminal Brand',
              required: true,
              options: this._dropDownService.getDropdown('POSTB'),
              labelProp: 'value',
              valueProp: 'code'
            }
          },
          {
            className: 'flex-1',
            type: 'select',
            key: 'terminalType',
            templateOptions: {
              label: 'Terminal Type',
              required: true,
              options: this._dropDownService.getDropdown('POSTT'),
              labelProp: 'value',
              valueProp: 'code',
            }
          },
          {
            className: 'flex-1',
            type: 'select',
            key: 'terminalModelRequested',
            templateOptions: {
              label: 'Terminal Model Requested',
              required: true,
              options: [],
              labelProp: 'value',
              valueProp: 'code',
            },
            lifecycle: {
              onInit: (form, field) => {
                const updateOptions = (v) => {
                  if (v) {
                    field.templateOptions.options = this._dropDownService.getTerminalModel(v);
                  } else {
                    field.templateOptions.options = this._dropDownService.getDropdown('TBTM');
                  }
                };
                updateOptions(form.get('terminalBrand').value);
                form.get('terminalBrand').valueChanges.subscribe(f => updateOptions(f));
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
            key: 'numberOfTerminalsRequested',
            defaultValue: '1',
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return model['userGroup'] === 'mauEncoder';
              }
            },
            templateOptions: {
              label: 'Number of Terminal/s Requested',
              required: true,
              maxLength: 10
            },
            validators: {
              validation: ['numeric'],
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'telcoProvider',
            templateOptions: {
              label: 'Telco Provider (for Dial-up)',
              required: true,
              maxLength: 50
            }
          },
          {
            className: 'flex-1',
            type: 'select',
            key: 'simType',
            templateOptions: {
              label: 'Sim Type (for GPRS)',
              required: true,
              options: this._dropDownService.getDropdown('POSST'),
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
            key: 'tipAdjust',
            type: 'radio',
            defaultValue: false,
            templateOptions: {
              label: 'TIP ADJUST',
              required: true,
              options: [
                { value: true, label: 'Yes' },
                { value: false, label: 'No' }
              ]
            }
          },
          {
            className: 'flex-1',
            key: 'hotelSetupFacility',
            type: 'radio',
            defaultValue: false,
            templateOptions: {
              label: 'HOTEL SET-UP FACILITY (PRE-AUTH, OFF-LINE)?',
              required: true,
              options: [
                { value: true, label: 'Yes' },
                { value: false, label: 'No' }
              ]
            }
          },
          {
            className: 'flex-1',
            key: 'manualKeyInFacility',
            type: 'radio',
            defaultValue: false,
            templateOptions: {
              label: 'MANUAL KEY-IN FACILITY?',
              required: true,
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
            key: 'creditStraightTid',
            expressionProperties: {
              'templateOptions.disabled': (model: any, formState: any) => {
                return model['userGroup'] !== 'psp';
              }
            },
            templateOptions: {
              label: 'Credit Straight TID'
            }
          },
          { className: 'flex-2' }
        ]
      }
    ];
  }

  update(id, terminal): Observable<any> {
    return this._http.put(ApiConstants.terminalDetailsApi + '/' + id, terminal);
  }

  create(terminal): Observable<any> {
    return this._http.post(ApiConstants.terminalDetailsApi, terminal);
  }
}
