import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';

@Injectable()
export class DropDownService {

  constructor(private _http: HttpClient) { }

  getDropdown(code): Observable<any> {
    return this._http.get(ApiConstants.dropdownlistApi + '/' + code);
  }
}