import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from "../api-constants";
import { Observable } from 'rxjs';

@Injectable()
export class DropDownService {

  constructor(private _http: HttpClient) { }

  getDropdown(code): Observable<any> {
    return this._http.get(ApiConstants.dropdownlistApi + '/' + code);
  }

  
}
