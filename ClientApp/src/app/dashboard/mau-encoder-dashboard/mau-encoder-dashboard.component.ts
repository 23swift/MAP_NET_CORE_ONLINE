import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { MauEncoderDashboardService } from './mau-encoder-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchModalComponent } from '../../modal/search-modal/search-modal.component';


@Component({
  selector: 'app-mau-encoder-dashboard',
  templateUrl: './mau-encoder-dashboard.component.html',
  styleUrls: ['./mau-encoder-dashboard.component.css'],
  providers: [MauEncoderDashboardService]
})
export class MauEncoderDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  mode: string;
  title: string;
  subTitle: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _service: MauEncoderDashboardService,
    private _matDialog: MatDialog) {
      this._service.getRequests().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
      });
     }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this.mode = 'create';
    this.title = '7';
    this.subTitle = 'MAU Encoder';  
  }

  getItem(id) {
    this._router.navigateByUrl('na/mauEncoder/' + id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatus(s) {
    if(s == '5'){ return 'For Evaluation'} else if (s == '10') { return 'Returned By MAM Approver'} 
  }

  openSearchDialog() {
    const dialogRef = this._matDialog.open(SearchModalComponent, {
      autoFocus: false,
      width: '40%',
      data: {
        userGroup: 'mdcsChecker'
      }
    });

    dialogRef.afterClosed().subscribe(filter => {
      if (filter) {
        this._service.filterDashboard(filter).subscribe(filteredList => {
          this.dataSource = new MatTableDataSource(filteredList);
          this.dataSource.sort = this.sort;

          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'requestDate': return new Date(item.requestedDate);
              default: return item[property];
            }
          };
        });
      } else {
        this._service.getRequests().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
        });
      }
    });
  } 

}
