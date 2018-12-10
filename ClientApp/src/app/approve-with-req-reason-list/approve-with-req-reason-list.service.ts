import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';

@Injectable()
export class ApproveWithReqReasonListService {


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
    return this._http.get(ApiConstants.approveWithReqReasonApi + '/appreqlist/' + id);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.approveWithReqReasonApi + '/' + id);
  }

}









