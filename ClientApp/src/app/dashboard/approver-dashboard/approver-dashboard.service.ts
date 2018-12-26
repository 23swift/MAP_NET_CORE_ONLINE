import { Injectable, OnInit } from '@angular/core';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { HttpClient } from 'node_modules/@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../../api-constants';

@Injectable()
export class ApproverDashboardService {
  private _dashboard: DashboardData;

  constructor(private _http: HttpClient) {
    this._dashboard = new DashboardData();
  }

  get() {
    return this._dashboard.ElementData;
  }

  getTableFields() {
    return this._dashboard.Fields;
  }

  getRequests(): Observable<any> {
    return this._http.get(ApiConstants.approverDashboardApi);
  }

}
