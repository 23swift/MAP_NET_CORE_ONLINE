import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardData } from '../temp/dashboardData/dashboard-data';
import { AoEncoderDashboardService } from '../dashboard/ao-encoder-dashboard/ao-encoder-dashboard.service';
import { CanActivateService } from '../services/can-activate.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css'],
  providers: [AoEncoderDashboardService]
})
export class HomeScreenComponent implements OnInit {
  mode = '';
  status = 'done';
  userGroup: string;
  tableFields: string[];
  tableHeader: string[];
  activeHeader: string;
  service: any;
  claims$: BehaviorSubject<Object>;

  constructor(private _router: ActivatedRoute, private _dashboard: DashboardData, private _service: AoEncoderDashboardService,
    private _canActivateService: CanActivateService) {
    this._router.params.subscribe(param => {
      this.userGroup = param['userGroup'];
    });
  }

  ngOnInit() {
    this.claims$ = this._canActivateService.claims$;
    this.tableFields = this._dashboard.Fields;
    this.tableHeader = ["Reference No", "Requested Data", "Request Type", "Business Name", "Requested By", "Status", "TAT"];
    this.activeHeader = "referenceNo";
    this.service = this._service;
  }

  getDashboard(access: string[], dashboard) {
    return access.indexOf(dashboard) > -1;
  }
}
