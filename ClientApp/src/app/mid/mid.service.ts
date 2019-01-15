import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../api-constants';

const apiUrl = '';
@Injectable()
export class MidService {

  constructor(private _http: HttpClient) { }

  get() {
    // return this._http.get(apiUrl);
    return [
      { Id: 1, Currency: 'PHP', MonitorCode: 'OTC', CardPlans: 'MCVCJCACCCDC', Status: 'ACTIVE' },
      { Id: 2, Currency: 'PHP', MonitorCode: 'Installment Reg', CardPlans: 'MCVCJCACCCDC', Status: 'ACTIVE' },
      { Id: 3, Currency: 'USD', MonitorCode: 'Reg Inst', CardPlans: 'MCVCJCACCCDC', Status: 'ACTIVE' },
      { Id: 4, Currency: 'PHP', MonitorCode: '0% Inst', CardPlans: 'AC', Status: 'ACTIVE' },
    ];
  }
  getTableFields(update) {
    return ['Currency', 'MonitorCode', 'CardPlans', 'Status', 'Mid', 'DebitTid', 'Action'];
  }

  create(): void {
    this._http.post(apiUrl, {});
  }

  update(): void {
    this._http.post(apiUrl, {});
  }

 
}
