import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MdcsEncoderDashboardService } from './mdcs-encoder-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { SearchModalComponent } from '../../modal/search-modal/search-modal.component';

@Component({
  selector: 'app-mdcs-encoder-dashboard',
  templateUrl: './mdcs-encoder-dashboard.component.html',
  styleUrls: ['./mdcs-encoder-dashboard.component.css'],
  providers: [MdcsEncoderDashboardService]
})
export class MdcsEncoderDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _service: MdcsEncoderDashboardService,
  private _matDialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
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
    this._router.navigateByUrl('na/mdcsEncoder/' + id);
  }

  getStatus() {
    return 'FOR ENCODING';
  }

  openSearchDialog() {
    const dialogRef = this._matDialog.open(SearchModalComponent, {
      autoFocus: false,
      width: '40%',
      data: {
        userGroup: 'mdcsEncoder'
      }
    });

    dialogRef.afterClosed().subscribe(filter => {
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
    });
  }
}
