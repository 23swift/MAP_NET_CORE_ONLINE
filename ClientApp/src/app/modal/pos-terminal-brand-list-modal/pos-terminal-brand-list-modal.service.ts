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
      }
    ];
  }

  getTerminalType() {
    return [
      {
        label: '',
        value: 0
      }
    ];
  }

  getTerminalModel() {
    return [
      {
        label: '',
        value: 0
      }
    ];
  }
}
