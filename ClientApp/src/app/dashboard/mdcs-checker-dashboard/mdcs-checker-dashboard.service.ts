import { Injectable, OnInit } from '@angular/core';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';

const apiUrl = '';
@Injectable()
export class MdcsCheckerDashboardService implements OnInit {
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
    return this._http.get(ApiConstants.mdcsCheckerDashboard);
  }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.mdcsCheckerDashboard + '/' + id);
  }

  create(): void {
    this._http.post(apiUrl, {});
  }

  update(): void {
    this._http.put(apiUrl, {});
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.mdcsCheckerDashboard + '/filter', searchCriteria);
  }
}
