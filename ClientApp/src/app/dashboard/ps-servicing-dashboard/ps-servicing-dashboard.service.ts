import { Injectable, OnInit } from '@angular/core';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';

const apiUrl = '';
@Injectable()
export class PsServicingDashboardService implements OnInit {
  private _dashboard: DashboardData;

  constructor(private _http: HttpClient) {
    this._dashboard = new DashboardData();
  }

  ngOnInit() {
    
  }

  getTableFields() {
    return this._dashboard.Fields;    
  }
  
  getAll(): Observable<any> {
    var result = this._http.get(ApiConstants.psServicingDashboardApi);
    return result;
  }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.psServicingDashboardApi + id);
  }

  create(): void {
    this._http.post(apiUrl, {});
  }

  update(): void {
    this._http.put(apiUrl, {});
  }
}
