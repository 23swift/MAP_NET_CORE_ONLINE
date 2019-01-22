import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';

@Injectable()
export class ApproveWithReqReasonListMqrService {

  constructor(private _http: HttpClient) { }

  getTableFields() {
    return ["Name", "Remarks", "Complied", "Action"];
  }

  get() {
    return [
      { awrsRequirement: 'MDR', awrsRemarks: 'MDR Remarks' }
    ];
  }

  getByAppReqId(id): Observable<any> {
    return this._http.get(ApiConstants.approveWithReqReasonMqrApi + '/appreqlistMqr/' + id);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.approveWithReqReasonMqrApi + '/' + id);
  }

}









