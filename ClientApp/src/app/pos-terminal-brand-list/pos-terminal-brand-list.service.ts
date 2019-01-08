import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';

interface IPosTerminalFields {
  TerminalBrand: string;
  TerminalType: string;
  TerminalModel: string;
  NumberOfTerminalsRequested: string;
  TelcoProvider: string;
  SimType: string;
  TipAdjust: string;
  HotelSetupFacility: string;
  ManualKeyInFacility: string;
}

@Injectable()
export class PosTerminalBrandListService {

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

}
