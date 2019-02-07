import { Injectable, OnInit } from '@angular/core';
//import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';

const apiUrl = '';
@Injectable()
export class MdcsUserDashboardService implements OnInit {
 // private _dashboard: DashboardData;

  constructor(private _http: HttpClient) {
    //this._dashboard = new DashboardData();
  }

  ngOnInit() {
    
  }

  getTableFields() {
    return ['referenceNo', 'requestedDate', 'requestType', 'businessName', 'requestedBy', 'status', 'tat', 'Operation']
  }
  
  getAll(): Observable<any> {
    return this._http.get(ApiConstants.mdcsUserDashboard);
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

  getTableData(field, sortDirection, pageIndex, pageSize, filter): Observable<any> {
    if (filter.match(/^\d+\//)) {
      filter = filter.replace(/\//g, '-');
    }
    return this._http.get(ApiConstants.mdcsUserDashboard + `/${field}/${sortDirection}/${pageIndex}/${pageSize}/${filter}`);
  }

  getCount() {
    return this._http.get(ApiConstants.mdcsUserDashboard + '/count');
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.mdcsUserDashboard + '/filter', searchCriteria);
  }

  
}
