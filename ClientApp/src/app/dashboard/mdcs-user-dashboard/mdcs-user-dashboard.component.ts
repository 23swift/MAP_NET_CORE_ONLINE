import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MdcsUserDashboardService } from './mdcs-user-dashboard.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MatSort, MatDialog, MatPaginator, MatSnackBar } from '@angular/material';
import { TableDataSourceService } from 'src/app/services/table-data-source.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SearchModalComponent } from 'src/app/modal/search-modal/search-modal.component';

@Component({
  selector: 'app-mdcs-user-dashboard',
  templateUrl: './mdcs-user-dashboard.component.html',
  styleUrls: ['./mdcs-user-dashboard.component.css'],
  providers: [MdcsUserDashboardService]
})
export class MdcsUserDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;
  displayedColumns: string[];
  dataSource: TableDataSourceService;
  totalCount: Observable<any>;
  mode: string;
  title: string;
  subTitle: string;

  constructor(private _service: MdcsUserDashboardService, private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog) {
    this.totalCount = this._service.getCount();
  }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this.mode = '';
    this.title = '';
    this.subTitle = '';
    this.dataSource = new TableDataSourceService(this._service);
    this.dataSource.loadTableData('referenceNo', 'desc', 0, 5, '');
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.dataSource.loadTableData(this.sort.active, this.sort.direction, this.paginator.pageIndex,
            this.paginator.pageSize, this.input.nativeElement.value);
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe((x) => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.dataSource.loadTableData(this.sort.active, this.sort.direction, this.paginator.pageIndex,
          this.paginator.pageSize, this.input.nativeElement.value))
      )
      .subscribe();
  }

  getItem(id) {
    this._router.navigateByUrl('na/mdcsUser/' + id);
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
          this.dataSource.filteredData(filteredList);
        });
      } else {
        this.dataSource.loadTableData('referenceNo', 'desc', 0, 5, '');
      }
    });
  }
}
