import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { PsServicingDashboardService } from './ps-servicing-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-ps-servicing-dashboard',
  templateUrl: './ps-servicing-dashboard.component.html',
  styleUrls: ['./ps-servicing-dashboard.component.css'],
  providers: [PsServicingDashboardService]
})
export class PsServicingDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  mode: string;
  title: string;
  subTitle: string;
  constructor(private _service: PsServicingDashboardService,
    private _router: Router) { }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this.mode = '';
    this.title = '';
    this.subTitle = '';

    this._service.getAll().subscribe(x => {
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'requestDate': return new Date(item.requestedDate);
          default: return item[property];
        }
      };
    })
  }

  getItem(requestId, branchId) {
    this._router.navigateByUrl('na/pss/' + requestId);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
