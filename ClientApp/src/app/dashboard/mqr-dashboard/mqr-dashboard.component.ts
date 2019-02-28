import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MqrDashboardService } from './mqr-dashboard.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { MatDialog, MatSnackBar, MatSort, MatPaginator } from '../../../../node_modules/@angular/material';
import { SearchModalComponent } from '../../modal/search-modal/search-modal.component';
import { TableDataSourceService } from 'src/app/services/table-data-source.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


@Component({
  selector: 'app-mqr-dashboard',
  templateUrl: './mqr-dashboard.component.html',
  styleUrls: ['./mqr-dashboard.component.css'],
  providers: [MqrDashboardService]
})


export class MqrDashboardComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;
  displayedColumns: string[];
  dataSource: TableDataSourceService;
  totalCount: Observable<any>;
  mode: string;
  title: string;
  subTitle: string;

  constructor(private _service: MqrDashboardService, private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog) {
    this.totalCount = this._service.getCount()
  }

  ngOnInit() {
    // this.displayedColumns = this._service.GetTableFields();
    this.displayedColumns = ['referenceNo', 'requestedDate', 'requestType', 'businessName', 'requestedBy', 'status', 'tat', 'Operation'];
    this.mode = 'update';
    this.title = 'New Affiliation';
    this.subTitle = '';
    this.dataSource = new TableDataSourceService(this._service);
    this.dataSource.loadTableData('referenceNo', 'desc', 0, 5, '');
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
  

  getItem(id) {
    this._service.getMaefData(id).subscribe(x => {
      this._router.navigateByUrl('na/mqrUser/' + id);
    })
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
}
