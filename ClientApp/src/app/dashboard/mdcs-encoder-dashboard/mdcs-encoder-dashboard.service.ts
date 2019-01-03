import { Injectable, OnInit } from '@angular/core';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { HttpClient } from 'node_modules/@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';

const apiUrl = '';
@Injectable()
export class MdcsEncoderDashboardService implements OnInit {
  private _dashboard: DashboardData;

  constructor(private _http: HttpClient) {
    this._dashboard = new DashboardData();
  }

  ngOnInit() {

  }

  getTableFields() {
    return this._dashboard.Fields;
  }

  getRequest(): Observable<any> {
    return this._http.get(ApiConstants.mdcsEncoderDashboard);
  }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.mdcsEncoderDashboard + '/' + id);
  }

  create(): void {
    this._http.post(apiUrl, {});
  }

  update(): void {
    this._http.put(apiUrl, {});
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.mdcsEncoderDashboard + '/filter', searchCriteria);
  }
}
