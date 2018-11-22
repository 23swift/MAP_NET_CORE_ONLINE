import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';

@Injectable()
export class SignatoriesListService {

  constructor(private _http: HttpClient) { }

  getTableFields() {
    return ['Name', 'SigningAuthority', 'Position', 'ApplicableTo', 'Action'];
  }

  get() {
    return [
      // { Name: 'Juan dela Cruz Jr.', SigningAuthority: 'Singly', Position: 'Proprietor', ApplicableTo: 'Legal Name'}
    ];
  }

  getByCustomerId(id): Observable<any> {
    return this._http.get(ApiConstants.signatoriesApi + '/customer/' + id);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.signatoriesApi + '/' + id);
  }

  getApplicableTo() {
    return [
      { label: 'Legal Name', value: 1 },
      { label: 'Branch <DBA Name>', value: 2 }
    ];
  }
}
