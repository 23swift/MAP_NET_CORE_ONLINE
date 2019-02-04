import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardData } from '../temp/dashboardData/dashboard-data';
import { AoEncoderDashboardService } from '../dashboard/ao-encoder-dashboard/ao-encoder-dashboard.service';

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
  constructor(private _router: ActivatedRoute, private _dashboard: DashboardData, private _service: AoEncoderDashboardService) {
    this._router.params.subscribe(param => {
      this.userGroup = param['userGroup'];
    });
  }

  ngOnInit() {
    this.tableFields = this._dashboard.Fields;
    this.tableHeader = ["Reference No", "Requested Data", "Request Type", "Business Name", "Requested By", "Status", "TAT"];
    this.activeHeader = "referenceNo";
    this.service = this._service;
  }

}
