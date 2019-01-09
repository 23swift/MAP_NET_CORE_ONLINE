import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';

const apiUrl = '';
@Injectable()
export class MdcsUserService {

  constructor(private _http: HttpClient) { }
  
  getAll() {
    return this._http.get(apiUrl);
  }

  get(id) {
    return this._http.get(apiUrl + id);
  }

  create(): void {
    this._http.post(apiUrl, {});
  }

  update(): void {
    this._http.put(apiUrl, {});
  }

  validateMID(id): Observable<any> { 
    return this._http.get(ApiConstants.mdcsUser + "/validateMid/" + id);
  }
}
