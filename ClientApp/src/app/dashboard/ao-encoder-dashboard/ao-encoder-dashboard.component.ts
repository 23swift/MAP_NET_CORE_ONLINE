import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AoEncoderDashboardService } from './ao-encoder-dashboard.service';
import { Router } from 'node_modules/@angular/router';
import { MatSort, MatDialog, MatPaginator } from '@angular/material';
import { DeleteModalComponent } from 'src/app/modal/delete-modal/delete-modal.component';
import { merge, fromEvent, Observable } from 'rxjs';
import { TableDataSourceService } from 'src/app/services/table-data-source.service';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-ao-encoder-dashboard',
  templateUrl: './ao-encoder-dashboard.component.html',
  styleUrls: ['./ao-encoder-dashboard.component.css'],
  providers: [AoEncoderDashboardService]
})
export class AoEncoderDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;
  displayedColumns: string[];
  dataSource: TableDataSourceService;
  totalCount: Observable<any>;
  mode: string;
  title: string;
  subTitle: string;

  constructor(private _service: AoEncoderDashboardService, private _router: Router,
    private _dialog: MatDialog) {
      this.totalCount = this._service.getCount();
  }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();

    this.mode = '';
    this.title = 'Account Officer';
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
    this._router.navigateByUrl('na/aoEncoder/' + id);
  }

  delete(id) {
    const dialog = this._dialog.open(DeleteModalComponent, {
      width: '60%',
      data: {
        delete: this._service.delete(id)
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.dataSource.loadTableData('referenceNo', 'desc', 0, 3, '');
    });
  }
}
