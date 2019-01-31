import { Injectable } from '@angular/core';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { HttpClient } from 'node_modules/@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';

@Injectable()
export class MdcsEncoderDashboardService {
  constructor(private _http: HttpClient, private _dashboard: DashboardData) { }

  getTableFields() {
    return this._dashboard.Fields;
  }

  getTableData(field, sortDirection, pageIndex, pageSize, filter): Observable<any> {
    if (filter.match(/^\d+\//)) {
      filter = filter.replace(/\//g, '-');
    }
    return this._http.get(ApiConstants.mdcsEncoderDashboardApi + `/${field}/${sortDirection}/${pageIndex}/${pageSize}/${filter}`);
  }

  getCount() {
    return this._http.get(ApiConstants.mdcsEncoderDashboardApi + '/count');
  }

  filterDashboard(searchCriteria): Observable<any> {
    return this._http.put(ApiConstants.mdcsEncoderDashboardApi + '/filter', searchCriteria);
  }
}
