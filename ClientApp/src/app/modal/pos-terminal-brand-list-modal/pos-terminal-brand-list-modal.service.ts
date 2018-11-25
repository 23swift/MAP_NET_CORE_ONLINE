import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';

@Injectable({
  providedIn: 'root'
})
export class PosTerminalBrandListModalService {

  constructor(private _http: HttpClient) { }

  getTableFields() {
    return ['TerminalBrand', 'TerminalType', 'TerminalModel', 'NumberOfTerminalsRequested', 'TelcoProvider', 'SimType', 'TipAdjust',
      'HotelSetupFacility', 'ManualKeyInFacility', 'Action'];
  }

  getByPos(posId): Observable<any> {
    return this._http.get(ApiConstants.terminalDetailsApi + '/pos/' + posId);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.terminalDetailsApi + '/' + id);
  }

  getTerminalBrand() {
    return [
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
    ];
  }

  getTerminalType() {
    return [
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
    ];
  }

  getTerminalModel() {
    return [
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
    ];
  }

  getSimType() {
    return [
      {
        label: 'GLOBE',
        value: 1
      },
      {
        label: 'SMART',
        value: 2
      }
    ];
  }
}
