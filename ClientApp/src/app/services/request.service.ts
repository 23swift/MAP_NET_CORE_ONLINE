import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http: HttpClient) { }

  getStatus(id) {
    return this._http.get(ApiConstants.requestApi + '/status/' + id);
  }
}
