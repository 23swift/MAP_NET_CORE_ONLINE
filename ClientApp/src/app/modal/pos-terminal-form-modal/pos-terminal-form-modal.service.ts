import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';

@Injectable()
export class PosTerminalFormModalService {

  constructor(private _http: HttpClient) { }

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
              options: [
                {
                  label: 'VERIFONE',
                  value: 1
                },
                {
                  label: 'CASTLES',
                  value: 2
                },
                {
                  label: 'INGENICO',
                  value: 3
                }
              ]
            }
          },
          {
            className: 'flex-1',
            type: 'select',
            key: 'terminalType',
            templateOptions: {
              label: 'Terminal Type',
              required: true,
              options: [
                {
                  label: 'IP - DIAL UP',
                  value: 1
                },
                {
                  label: 'TRI-MODE COUNTERTOP',
                  value: 2
                },
                {
                  label: 'WIRED GPRS',
                  value: 3
                }
              ]
            }
          },
          {
            className: 'flex-1',
            type: 'select',
            key: 'terminalModelRequested',
            templateOptions: {
              label: 'Terminal Model Requested',
              required: true,
              options: [
                {
                  label: 'VX520 COMBO',
                  value: 1
                },
                {
                  label: 'V50005',
                  value: 2
                },
                {
                  label: 'ICT250 GEM CL',
                  value: 3
                }
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
            key: 'numberOfTerminalsRequested',
            templateOptions: {
              label: 'Number of Terminal/s Requested',
              required: true,
              type: 'number',
              maxLength: 10,
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
              options: [
                {
                  label: 'GLOBE',
                  value: 1
                },
                {
                  label: 'SMART',
                  value: 2
                }
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
            templateOptions: {
              label: 'Credit Straight TID'
            }
          },
          {className: 'flex-2'}
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
