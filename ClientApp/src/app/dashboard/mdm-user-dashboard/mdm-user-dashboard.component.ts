import { Component, OnInit, ViewChild } from '@angular/core';
import { MdmUserDashboardService } from './mdm-user-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SearchModalComponent } from 'src/app/modal/search-modal/search-modal.component';

@Component({
  selector: 'app-mdm-user-dashboard',
  templateUrl: './mdm-user-dashboard.component.html',
  styleUrls: ['./mdm-user-dashboard.component.css'],
  providers: [MdmUserDashboardService]
})
export class MdmUserDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  mode: string;
  title: string;
  subTitle: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _service: MdmUserDashboardService, private _matDialog: MatDialog,
    ) { }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this.getRequests();

    this.mode = '';
    this.title = '';
    this.subTitle = '';
  }

  getRequests() {
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
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getItem(requestId, branchId) {
    this._router.navigateByUrl('na/mdm/' + requestId);
  }

  openSearchDialog() {
    const dialogRef = this._matDialog.open(SearchModalComponent, {
      autoFocus: false,
      width: '40%',
      data: {
        userGroup: 'mdmUser'
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
        this.getRequests();
      }
    });
  }
}
