import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MauEncoderDashboardService } from './mau-encoder-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchModalComponent } from '../../modal/search-modal/search-modal.component';
import { TableDataSourceService } from 'src/app/services/table-data-source.service';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


@Component({
  selector: 'app-mau-encoder-dashboard',
  templateUrl: './mau-encoder-dashboard.component.html',
  styleUrls: ['./mau-encoder-dashboard.component.css'],
  providers: [MauEncoderDashboardService]
})
export class MauEncoderDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;
  displayedColumns: string[];
  totalCount: Observable<any>;
  dataSource: TableDataSourceService;

  mode: string;
  title: string;
  subTitle: string;

  constructor(private _router: Router, private _service: MauEncoderDashboardService,
    private _matDialog: MatDialog) {
      this.totalCount = this._service.getCount();
     }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this.mode = 'create';
    this.title = '7';
    this.subTitle = 'MAU Encoder'; 
    this.dataSource = new TableDataSourceService(this._service);
    this.dataSource.loadTableData('referenceNo', 'desc', 0, 5, '');     
  }

  getItem(id) {
    this._router.navigateByUrl('na/mauEncoder/' + id);
  }

  /*applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } */

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
          this.dataSource.filteredData(filteredList);
        });
      } else {
        this.dataSource.loadTableData('referenceNo', 'desc', 0, 5, '');
      }
    });
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
