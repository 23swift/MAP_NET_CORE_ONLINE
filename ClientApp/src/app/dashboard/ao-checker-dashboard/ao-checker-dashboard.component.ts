import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AoCheckerDashboardService } from './ao-checker-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-ao-checker-dashboard',
  templateUrl: './ao-checker-dashboard.component.html',
  styleUrls: ['./ao-checker-dashboard.component.css'],
  providers: [AoCheckerDashboardService]
})
export class AoCheckerDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  mode: string;
  title: string;
  subTitle: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _service: AoCheckerDashboardService) { }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this._service.get().subscribe(dd => {
      this.dataSource = new MatTableDataSource(dd);
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'requestDate': return new Date(item.requestedDate);
          default: return item[property];
        }
      };
    });

    this.mode = '';
    this.title = '';
    this.subTitle = '';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatus() {
    return 'FOR AO CHECKER\'S REVIEW';
  }

  private getItem(Id) {
    this._router.navigateByUrl('na/aoChecker/' + Id);
  }
}
