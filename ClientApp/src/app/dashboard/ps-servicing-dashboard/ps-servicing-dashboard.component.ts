import { Component, OnInit, ViewChild, Output, ElementRef } from '@angular/core';
import { PsServicingDashboardService } from './ps-servicing-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TableDataSourceService } from 'src/app/services/table-data-source.service';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ps-servicing-dashboard',
  templateUrl: './ps-servicing-dashboard.component.html',
  styleUrls: ['./ps-servicing-dashboard.component.css'],
  providers: [PsServicingDashboardService]
})
export class PsServicingDashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;
  displayedColumns: string[];
  dataSource: TableDataSourceService;
  totalCount: Observable<any>;

  mode: string;
  title: string;
  subTitle: string;
  constructor(private _service: PsServicingDashboardService,
    private _router: Router) { 
      this.totalCount = this._service.getCount();
    }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    this.mode = '';
    this.title = 'Payment Solution - Servicing';
    this.subTitle = '';
    this.dataSource = new TableDataSourceService(this._service);
    this.dataSource.loadTableData('referenceNo', 'desc', 0, 5, '');
  }

  getItem(requestId) {
    this._router.navigateByUrl('na/pss/' + requestId);
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
