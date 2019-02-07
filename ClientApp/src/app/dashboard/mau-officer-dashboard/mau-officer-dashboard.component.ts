import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MauOfficerDashboardService } from './mau-officer-dashboard.service';
import { MatDialog, MatSnackBar, MatSort, MatPaginator } from '../../../../node_modules/@angular/material';
import { AoListModalComponent } from '../../modal/ao-list-modal/ao-list-modal.component';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { TableDataSourceService } from 'src/app/services/table-data-source.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SearchModalComponent } from 'src/app/modal/search-modal/search-modal.component';
// import { MapWebNotificationService } from 'src/app/map-web-notification/map-web-notification.service';

@Component({
  selector: 'app-mau-officer-dashboard',
  templateUrl: './mau-officer-dashboard.component.html',
  styleUrls: ['./mau-officer-dashboard.component.css'],
  providers: [MauOfficerDashboardService]
})
export class MauOfficerDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;
  displayedColumns: string[];
  dataSource: TableDataSourceService;
  totalCount: Observable<any>;
  mode: string;
  title: string;
  subTitle: string;


  constructor(private _service: MauOfficerDashboardService,
    private _dialog: MatDialog,
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

  editItem(id) {
    this._router.navigateByUrl('na/mauOfficer/' + id);
  }

  openDialog(Id, ReferenceNo, UserName): void {

    const dialogRef = this._dialog.open(AoListModalComponent, {
      width: '30%',
      data: { Id: Id, ReferenceNo: ReferenceNo, UserName: UserName }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this._snackBar.open('Successfully Assigned To : ', data.firstName + ' ' + data.lastName,
          {
            duration: 2000
          });
        this._service.Get().subscribe(x => {
          this.dataSource = x;
        });
      }
    });
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

  ownRequest(id) {
    this._router.navigateByUrl('na/mauOfficer/' + id);
  }

}
