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
              options: [
                {
                  label: 'VERIFONE',
                  value: 1
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
              options: [
              ]
            }
          },
          {
            className: 'flex-1',
            type: 'select',
            key: 'terminalModelRequested',
            templateOptions: {
              label: 'Terminal Model Requested',
              options: [
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
              label: 'Number of Terminal/s Requested'
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'telcoProvider',
            templateOptions: {
              label: 'Telco Provider (for Dial-up)'
            }
          },
          {
            className: 'flex-1',
            type: 'input',
            key: 'simType',
            templateOptions: {
              label: 'Sim Type (for GPRS)'
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
            templateOptions: {
              label: 'TIP ADJUST',
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
            templateOptions: {
              label: 'HOTEL SET-UP FACILITY (PRE-AUTH, OFF-LINE)?',
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
            templateOptions: {
              label: 'MANUAL KEY-IN FACILITY?',
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
