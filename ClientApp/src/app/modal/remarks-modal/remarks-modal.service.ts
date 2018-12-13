import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../../api-constants';

const apiUrl = '';
@Injectable()
export class RemarksModalService {

  constructor(private _http: HttpClient) { }

  getById() {
    return this._http.get(apiUrl);
  }

  create(history): Observable<any> {
    return this._http.post(ApiConstants.maefApi+ '/history', history);
  }

}
