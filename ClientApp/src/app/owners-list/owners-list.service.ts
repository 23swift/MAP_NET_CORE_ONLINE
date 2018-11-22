import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';
import { Observable } from 'rxjs';

@Injectable()
export class OwnersListService {

  constructor(private _http: HttpClient) { }

  getTableFields() {
    return ['Name', 'PercentOfOwnership', 'TypeOfRelatedParty', 'Remarks', 'Action'];
  }
/*
  get(customerProfileId): Observable<any> {
    return this._http.get(ApiConstants.ownersApi + '/' + customerProfileId);
  } */

  get() {
    return [
      { Name: 'Juan dela Cruz', PercentOfOwnership: '50', TypeOfRelatedParty: 'Subsidiary', Remarks: 'Remarks' }
    ];
  }

  getByCustomerId(id): Observable<any> {
    return this._http.get(ApiConstants.ownersApi + '/customer/' + id);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.ownersApi + '/' + id);
  }

  getTypeOfRelatedParty() {
    return [
      { label: 'DOSRI', value: 1 },
      { label: 'Subsidiary', value: 2 },
      { label: 'Affiliate', value: 3 },
      { label: 'Other Related Party', value: 4 }
    ];
  }
}
