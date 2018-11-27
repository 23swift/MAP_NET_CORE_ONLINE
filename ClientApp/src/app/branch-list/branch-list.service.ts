import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';

@Injectable()
export class BranchListService {

  constructor(private _http: HttpClient) { }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.branchApi + '/' + id);
  }

  getByNewAffiliationId(id): Observable<any> {
    return this._http.get(ApiConstants.branchApi + '/newAffiliation/' + id);
  }

  getBranchAutoPopulateFields(id): Observable<any> {
    return this._http.get(ApiConstants.branchApi + '/branchAutoPopulate/' + id);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.branchApi + '/' + id);
  }
}
