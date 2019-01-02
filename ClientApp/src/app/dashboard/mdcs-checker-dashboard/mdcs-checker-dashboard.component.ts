import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdcsCheckerDashboardService } from './mdcs-checker-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { SearchModalComponent } from '../../modal/search-modal/search-modal.component';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-mdcs-checker-dashboard',
  templateUrl: './mdcs-checker-dashboard.component.html',
  styleUrls: ['./mdcs-checker-dashboard.component.css'],
  providers: [MdcsCheckerDashboardService]
})
export class MdcsCheckerDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource;
  
  constructor(private _route: ActivatedRoute, private _router: Router, private _service: MdcsCheckerDashboardService,
  private _matDialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this.getRequests();
  }

  getRequests() {
    this._service.getRequest().subscribe(d => {
      this.dataSource = new MatTableDataSource(d);
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

  getItem(id) {
    this._router.navigateByUrl('na/mdcsChecker/' + id);
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
        this.getRequests();
      }
    });
  }
}
