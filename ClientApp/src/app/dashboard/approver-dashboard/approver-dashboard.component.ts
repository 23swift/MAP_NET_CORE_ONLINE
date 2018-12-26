import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchModalComponent } from '../../modal/search-modal/search-modal.component';
import { ApproverDashboardService } from './approver-dashboard.service';

@Component({
  selector: 'app-approver-dashboard',
  templateUrl: './approver-dashboard.component.html',
  styleUrls: ['./approver-dashboard.component.css'],
  providers: [ApproverDashboardService]
})
export class ApproverDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  mode: string;
  title: string;
  subTitle: string;
  constructor(private _service: ApproverDashboardService, private _route: ActivatedRoute, private _router: Router,
    private _matDialog: MatDialog) {
        this._service.getRequests().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
     }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();

    this.mode = 'create';
    this.title = 'New Affiliation';
    this.subTitle = 'Approver';
  }

  getItem(id) {
    this._router.navigateByUrl('na/approver/' + id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatus(s) {
    if(s == '5'){ return 'For Approval'}  
  }

  openSearchDialog() {
    const dialogRef = this._matDialog.open(SearchModalComponent, {
      autoFocus: false,
      width: '40%'
    });
  }


}
