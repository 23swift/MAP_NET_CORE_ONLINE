import { Component, OnInit } from '@angular/core';
import { AoEncoderDashboardService } from './ao-encoder-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { Router } from 'node_modules/@angular/router';

@Component({
  selector: 'app-ao-encoder-dashboard',
  templateUrl: './ao-encoder-dashboard.component.html',
  styleUrls: ['./ao-encoder-dashboard.component.css'],
  providers: [AoEncoderDashboardService]
})
export class AoEncoderDashboardComponent implements OnInit {
  displayedColumns: string[];
  dataSource = [];

  mode: string;
  title: string;
  subTitle: string;
  constructor(private _service: AoEncoderDashboardService, private _router: Router) { }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this._service.getRequests().subscribe(data => {
      this.dataSource = data;
    });

    this.mode = 'create';
    this.title = 'New Affiliation';
    this.subTitle = 'AO Encoder';
  }

  getItem(id) {
    this._router.navigateByUrl('na/aoEncoder/' + id);
  }

  getStatus() {
    return 'DRAFT';
  }
}
