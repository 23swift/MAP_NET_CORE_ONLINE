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
      { value: 1, label: 'MCVCJCACCCDC (CAPTURE ALL)' }
    ];
  }

  getMonitorCode() {
    return [
      { value: 1, label: 'OTC for Straight' },
      { value: 2, label: '0% Installment' },
      { value: 3, label: 'Regular Installment' },
      { value: 4, label: 'BNPL 0%' },
      { value: 5, label: 'BNPL Regular' },
      { value: 6, label: 'BNPL Installment' },
      { value: 7, label: 'MOTO' }
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
