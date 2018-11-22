import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';
import { Observable } from 'rxjs';

@Injectable()
export class PosListService {

  constructor(private _http: HttpClient) { }

  getTableFields() {
    return ['PosTrackingNumber', 'NatureOfRequest', 'DateRequested', 'RequestedBy', 'Action'];
  }

  getByBranch(id): Observable<any> {
    return this._http.get(ApiConstants.posApi + '/branch/' + id);
  }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.posApi + '/' + id);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.posApi + '/' + id);
  }

  getNatureOfRequest() {
    return [
      { value: 1, label: 'Installation' },
      { value: 2, label: 'Reprogramming' },
      { value: 3, label: 'TID Issuance' }
    ];
  }
}
