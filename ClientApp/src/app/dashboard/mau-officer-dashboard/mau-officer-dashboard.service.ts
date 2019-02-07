import { Injectable,Inject  } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { AoListData } from "../../temp/aoListData/ao-list-data";
import { ApiConstants } from 'src/app/api-constants';

@Injectable()
export class MauOfficerDashboardService {
  //private _dashboard: DashboardData;

  constructor(private _http: HttpClient, private _dashboard: DashboardData) {
    //this._dashboard = new DashboardData();
  }

  Get(): Observable<any> {
    return this._http.get(ApiConstants.mauOfficerDashboardApi);
  }

  getTableFields() {
    return ['referenceNo', 'requestedDate', 'requestType', 'businessName', 'requestedBy', 'status', 'tat','Operation']
  }

  getTableData(field, sortDirection, pageIndex, pageSize, filter): Observable<any> {
    if (filter.match(/^\d+\//)) {
      filter = filter.replace(/\//g, '-');
    }
    return this._http.get(ApiConstants.mauOfficerDashboardApi + `/${field}/${sortDirection}/${pageIndex}/${pageSize}/${filter}`);
  }

  getCount() {
    return this._http.get(ApiConstants.mauOfficerDashboardApi + '/count');
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.mauOfficerDashboardApi + '/filter', searchCriteria);
  }

}
