import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentListService {

  constructor(private _http: HttpClient) { }

  getByCode(code): Observable<any> {
    return this._http.get(ApiConstants.documentListApi + '/' + code);
  }

  get(): Observable<any> {
    return this._http.get(ApiConstants.documentListApi);
  }
}
