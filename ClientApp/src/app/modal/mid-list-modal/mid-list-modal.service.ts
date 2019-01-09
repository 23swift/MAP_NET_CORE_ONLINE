import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { DropDownService } from 'src/app/services/drop-down.service';

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
      { code: 1, value: 'Active' },
      { code: 2, value: 'Inactive' }
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

  validateByBranchId(id): Observable<any> {
    return this._http.get(ApiConstants.midApi + '/validate/' + id);
  }

  getExistingMonitorCodes(id): Observable<any> {
    return this._http.get(ApiConstants.midApi + '/existingMonitorCodes/' + id);
  }
}
