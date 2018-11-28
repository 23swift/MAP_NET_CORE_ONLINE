import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class NewAffiliationRequestService {

  constructor(private _http: HttpClient) { }

  updateRequestForAoEncoder(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/aoEncoder/' + id, {});
  }

  returnToAoEncoder(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/returnToAoEncoder/' + id, {});
  }

  updateRequestForAoChecker(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/aoChecker/' + id, {});
  }
}
