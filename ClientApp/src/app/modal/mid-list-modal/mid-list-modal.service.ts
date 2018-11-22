import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';

@Injectable({
  providedIn: 'root'
})
export class MidListModalService {

  constructor(private _http: HttpClient) { }

  getCardPlans() {
    return [
      { value: 1, label: 'OTC' },
      { value: 2, label: 'Installment Reg' }
    ];
  }

  getMonitorCode() {
    return [
      { value: 1, label: 'OTC' },
      { value: 2, label: 'Installment Reg' }
    ];
  }

  getStatus() {
    return [
      { value: 1, label: 'Active' },
      { value: 2, label: 'Inactive' }
    ];
  }

  getTableFields(update) {
    return ['Currency', 'MonitorCode', 'CardPlans', 'Status', 'Mid', 'DebitTid', 'Action'];
  }

  get(midId): Observable<any> {
    return this._http.get(ApiConstants.midApi + '/' + midId);
  }

  getByBranchId(id): Observable<any> {
    return this._http.get(ApiConstants.midApi + '/branch/' + id);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.midApi + '/' + id);
  }
}
