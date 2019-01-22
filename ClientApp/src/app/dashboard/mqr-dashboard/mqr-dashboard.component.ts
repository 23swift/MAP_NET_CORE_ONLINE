import { Component, OnInit, ViewChild } from '@angular/core';
import { MqrDashboardService } from './mqr-dashboard.service';
//import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { Route, Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource, MatSort } from '../../../../node_modules/@angular/material';

import { SearchModalComponent } from '../../modal/search-modal/search-modal.component';


@Component({
  selector: 'app-mqr-dashboard',
  templateUrl: './mqr-dashboard.component.html',
  styleUrls: ['./mqr-dashboard.component.css'],
  providers: [MqrDashboardService]
})


export class MqrDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  mode: string;
  title: string;
  subTitle: string;

  constructor(private _service: MqrDashboardService, private _router: Router, private _matDialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.displayedColumns = this._service.GetTableFields();
    this.displayedColumns = ['referenceNo', 'requestDate', 'requestType', 'businessName', 'requestedBy', 'status', 'tat', 'Operation'];
    this._service.getAll().subscribe(d => {
      var filteredData = d.filter(x => x.status !== "CANCELED REQUEST");
      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'requestDate': return new Date(item.requestedDate);
          default: return item[property];
        }
      };
    });

    this.mode = 'update';
    this.title = 'New Affiliation';
    this.subTitle = '';
  }

  openSearchDialog() {
    const dialogRef = this._matDialog.open(SearchModalComponent, {
      autoFocus: false,
      width: '40%',
      data: {
        userGroup: 'mqrUser'
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getItem(id) {
    this._service.getMaefData(id).subscribe(x => { 
      this._router.navigateByUrl('na/mqrUser/' + id);
    })
  }
}
