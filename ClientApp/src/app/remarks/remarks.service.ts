import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';

@Injectable({
  providedIn: 'root'
})
export class RemarksService {

  constructor(private _http: HttpClient) { }
  getByRequestId(requestId): Observable<any> {
    return this._http.get(ApiConstants.maefApi + '/returnRemarks/' + requestId);
  }

  getLastRemarks(requestId): Observable<any> {
    return this._http.get(ApiConstants.maefApi + '/lastRemarks/' + requestId);    
  }
}
