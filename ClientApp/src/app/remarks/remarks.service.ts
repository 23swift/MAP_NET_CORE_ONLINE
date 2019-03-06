import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';

@Injectable({
  providedIn: 'root'
})
export class RemarksService {

  constructor(private _http: HttpClient) { }
  getByRequestId(requestId, status): Observable<any> {
    return this._http.get(ApiConstants.maefApi + '/returnRemarks/' + requestId +'/'+ status);
  }

  getLastRemarks(requestId, status): Observable<any> {
    return this._http.get(ApiConstants.maefApi + '/lastRemarks/' + requestId +'/'+ status);    
  }

  getRequestStatus(requestId): Observable<any> {
    return this._http.get(ApiConstants.requestApi + '/status/' + requestId);
  }

  create(remarks): Observable<any> {
    return this._http.post(ApiConstants.maefApi +'/remarks', remarks);
  }

  update(id, remarks): Observable<any> {
    return this._http.put(ApiConstants.maefApi + '/remarks/' + id, remarks);
  }

  getRemark(id): Observable<any> {
    return this._http.get(ApiConstants.maefApi + '/remark/' + id); 
  }
}
