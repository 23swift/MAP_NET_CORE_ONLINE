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
    return this._dashboard.ApproverFields;
  }

  getRequests(): Observable<any> {
    return this._http.get(ApiConstants.approverDashboardApi);
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.approverDashboardApi+ '/filter', searchCriteria);
  }

  getTableData(field, sortDirection, pageIndex, pageSize, filter): Observable<any> {
    if (filter.match(/^\d+\//)) {
      filter = filter.replace(/\//g, '-');
    }
    return this._http.get(ApiConstants.approverDashboardApi + `/${field}/${sortDirection}/${pageIndex}/${pageSize}/${filter}`);
  }

  getCount() {
    return this._http.get(ApiConstants.approverDashboardApi + '/count');
  }

}
