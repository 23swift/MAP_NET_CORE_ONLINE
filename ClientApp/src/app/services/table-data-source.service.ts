import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

export class TableDataSourceService implements DataSource<any> {
  private dataList = new BehaviorSubject<any[]>([]);
  
  constructor(private service: any) {
  }

  connect(collectionViewer: CollectionViewer): Observable<any> {
    return this.dataList.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataList.complete();
  }

  loadTableData(field = 'trackingNo', sortDirection = 'asc', pageIndex = 0, pageSize = 3, filter = ''): void {
    this.service.getTableData(field, sortDirection, pageIndex, pageSize, filter).subscribe(data => {
      this.dataList.next(data);
    });
  }

  filteredData(data) {
    this.dataList.next(data);
  }
}
