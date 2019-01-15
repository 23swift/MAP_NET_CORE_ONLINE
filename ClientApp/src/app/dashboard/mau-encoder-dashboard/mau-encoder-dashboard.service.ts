import { Injectable, OnInit } from '@angular/core';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { HttpClient } from 'node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../../api-constants';

const apiUrl = '';
@Injectable()
export class MauEncoderDashboardService implements OnInit {
  private _dashboard: DashboardData;

  constructor(private _http: HttpClient) {
    this._dashboard = new DashboardData();
  }

  ngOnInit() {
    
  }

  getTableFields() {
    return this._dashboard.Fields;
  }
  
  getRequests(): Observable<any> {
    return this._http.get(ApiConstants.mauEncoderDashboardApi);
  }

  get(id) {
    // return this._http.get(apiUrl + id);
    return this._dashboard.ElementData;
  }

  create(): void {
    this._http.post(apiUrl, {});
  }

  update(): void {
    this._http.put(apiUrl, {});
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.mauEncoderDashboardApi+ '/filter', searchCriteria);
  }

}

