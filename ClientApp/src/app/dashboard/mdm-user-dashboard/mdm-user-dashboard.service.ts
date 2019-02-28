import { Injectable, OnInit } from '@angular/core';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';

@Injectable()
export class MdmUserDashboardService {

  constructor(private _http: HttpClient, private _dashboard: DashboardData) {
  }

  getTableFields() {
    return this._dashboard.Fields;
  }

  getTableData(field, sortDirection, pageIndex, pageSize, filter): Observable<any> {
    if (filter.match(/^\d+\//)) {
      filter = filter.replace(/\//g, '-');
    }
    return this._http.get(ApiConstants.mdmUserDashboardApi + `/${field}/${sortDirection}/${pageIndex}/${pageSize}/${filter}`);
  }

  getCount() {
    return this._http.get(ApiConstants.mdmUserDashboardApi + '/count');
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.mdmUserDashboardApi + '/filter', searchCriteria);
  }
}
