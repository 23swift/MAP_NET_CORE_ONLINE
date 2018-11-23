import { Injectable,Inject  } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../../temp/dashboardData/dashboard-data';
import { AoListData } from "../../temp/aoListData/ao-list-data";
import { ApiConstants } from 'src/app/api-constants';

@Injectable()
export class MauOfficerDashboardService {
  //private _dashboard: DashboardData;

  constructor(private _http: HttpClient) {
    //this._dashboard = new DashboardData();
  }

  Get() {
    return this._http.get(ApiConstants.mauOfficerDashboardApi);
  }

  GetTableFields() {
    //return this._dashboard.Fields;
  }

}
