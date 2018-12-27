import { Component, OnInit, ViewChild } from '@angular/core';
import { MdcsUserDashboardService } from './mdcs-user-dashboard.service';
//import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { Router } from '../../../../node_modules/@angular/router';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SearchModalComponent } from 'src/app/modal/search-modal/search-modal.component';

@Component({
  selector: 'app-mdcs-user-dashboard',
  templateUrl: './mdcs-user-dashboard.component.html',
  styleUrls: ['./mdcs-user-dashboard.component.css'],
  providers: [MdcsUserDashboardService]
})
export class MdcsUserDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  mode: string;
  title: string;
  subTitle: string;
  constructor(private _service: MdcsUserDashboardService, private _router: Router, private _matDialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = ['referenceNo', 'requestDate', 'requestType',
      'businessName', 'dbaName', 'requestedBy',
      'status', 'tat', 'Operation']
    this._service.getAll().subscribe(d => {
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'requestDate': return new Date(item.requestedDate);
          default: return item[property];
        }
      };
    });

    this.mode = 'create';
    this.title = 'New Affiliation';
    this.subTitle = 'MDCS User';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatus() {
    return 'FOR CREATION';
  }

  getItem(id) {
    this._router.navigateByUrl('na/mdcsUser/' + id);
  }

  openSearchDialog() {
    const dialogRef = this._matDialog.open(SearchModalComponent, {
      autoFocus: false,
      width: '40%',
      data: {
        userGroup: 'mdcsUser'
      }
    });

  }
}
