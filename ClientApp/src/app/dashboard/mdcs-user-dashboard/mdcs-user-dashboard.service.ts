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
   // return this._dashboard.MdcsFields;
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

  
}
