import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AoEncoderDashboardService } from '../dashboard/ao-encoder-dashboard/ao-encoder-dashboard.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

export class TableDataSourceService implements DataSource<any> {
  private dataList = new BehaviorSubject<any[]>([]);
  private showLoader = new BehaviorSubject<boolean>(false);

  public loading$ = this.showLoader.asObservable();
  constructor(private service: any) { }

  connect(collectionViewer: CollectionViewer): Observable<any> {
    return this.dataList.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataList.complete();
    this.showLoader.complete();
  }

  loadTableData(): void {
    this.showLoader.next(true);
    this.service.getTableData().subscribe(data => {
      this.dataList.next(data);
      this.showLoader.next(false);
    });
  }
}
