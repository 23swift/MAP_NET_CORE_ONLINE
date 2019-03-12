import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';

@Injectable({
  providedIn: 'root'
})
export class BdoDefaultHeaderService {

  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.post(ApiConstants.logoutApi, {});
  }
}
