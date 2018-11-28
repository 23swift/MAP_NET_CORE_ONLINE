import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';

@Injectable()
export class RequestHeaderService {

  constructor(private _http: HttpClient) { }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.requestHeaderApi + '/' + id);
  }
}
