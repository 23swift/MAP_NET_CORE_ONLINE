import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';

const apiUrl = '';
@Injectable({
  providedIn: 'root'
})
export class PsServicingService {

  constructor(private _http: HttpClient) { }
  
  getAll() {
    return this._http.get(apiUrl);
  }

  get(requestId,branchId): Observable<any> {
    return this._http.get(ApiConstants.psServicingDashboardApi + '/' + requestId + '/' + branchId);
  }

  validateForPsServicing(id): Observable<any> {
    return this._http.get(ApiConstants.posApi + '/validateForPsServicing/' + id);
  }

  create(): void {
    this._http.post(apiUrl, {});
  }

  update(): void {
    this._http.put(apiUrl, {});
  }
  
}
