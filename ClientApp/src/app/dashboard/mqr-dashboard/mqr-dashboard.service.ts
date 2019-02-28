import { Injectable } from '@angular/core';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';

const apiUrl = '';
@Injectable()
export class MqrDashboardService {
  private _dashboard: DashboardData;

  constructor(private _http: HttpClient) {
    //this._dashboard = new DashboardData();
  }

  getTableFields() {
    return ['referenceNo', 'requestedDate', 'requestType', 'businessName', 'requestedBy', 'status', 'tat', 'Operation']
  }


  getAll(): Observable<any> {
    return this._http.get(ApiConstants.mqrUserDashboard);
    //return this._dashboard.MdcsData;
  }

  get(id) {
    // return this._http.get(apiUrl + id);
    //return this._dashboard.MdcsData;
  }

  create(): void {
    this._http.post(apiUrl, {});
  }

  update(): void {
    this._http.put(apiUrl, {});
  }

  getMaefData(id): Observable<any> {
    return this._http.post(ApiConstants.mqrUserDashboard + '/mqrUserDashboard/' + id, {})
  }

  getTableData(field, sortDirection, pageIndex, pageSize, filter): Observable<any> {
    if (filter.match(/^\d+\//)) {
      filter = filter.replace(/\//g, '-');
    }
    return this._http.get(ApiConstants.mqrUserDashboard + `/${field}/${sortDirection}/${pageIndex}/${pageSize}/${filter}`);
  }

  getCount() {
    return this._http.get(ApiConstants.mqrUserDashboard + '/count');
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.mqrUserDashboard + '/filter', searchCriteria);
  }
}
