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

  returnToMamo(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/returnToMamo/' + id, {});
  }

  decline(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/decline/' + id, {});
  }

  updateRequestForAoChecker(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/aoChecker/' + id, {});
  }

  updateRequestForMdcsEncoder(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/mdcsEncoder/' + id, {});
  }

  updateRequestForMdcsChecker(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/mdcsChecker/' + id, {});
  }

  updateRequestForMauOfficer(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/mauOfficer/' + id, {});
  }

  updateRequestForMdcsUser(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/mdcsUser/' + id, {});
  }
  
  updateRequestForPsServicing(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/psServicing/' + id, {});
  }

  updateRequestReturnedByMARO(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/mqrUserReturned/' + id, {});
  }

  updateRequestCancelRequest(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/mqrUserCancel/' + id, {});
  }

  updateRequestComplied(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/mqrUserComplied/' + id, {});
  }

  updateRequestSubmitToMARApproval(id): Observable<any> {
    return this._http.put(ApiConstants.newAffiliationApi + '/mqrUserSubmit/' + id, {});
  }
}
