import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';

@Injectable()
export class ApproveWithExceptReasonDetailsListService {

  constructor(private _http: HttpClient) { }

  getTableFields() {
    return ["Date", "Requirements", "Remarks", "Action"];   
  }

  get() {
    return [
      { Date: '11/30/2018', Requirements: 'MDR-Related', Remarks: 'Remarks' }
    ];
  }

  getByAppExId(id): Observable<any> {
    return this._http.get(ApiConstants.approveWithExceptDetailsApi + '/appexlist/' + id);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.approveWithExceptDetailsApi + '/' + id);
  }


}



