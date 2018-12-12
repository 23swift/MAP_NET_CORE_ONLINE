import { Component, OnInit, ViewChild } from '@angular/core';
import { AoEncoderDashboardService } from './ao-encoder-dashboard.service';
import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { Router } from 'node_modules/@angular/router';
import { MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { DeleteModalComponent } from 'src/app/modal/delete-modal/delete-modal.component';

@Component({
  selector: 'app-ao-encoder-dashboard',
  templateUrl: './ao-encoder-dashboard.component.html',
  styleUrls: ['./ao-encoder-dashboard.component.css'],
  providers: [AoEncoderDashboardService]
})
export class AoEncoderDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  mode: string;
  title: string;
  subTitle: string;
  constructor(private _service: AoEncoderDashboardService, private _router: Router,
    private _snackBar: MatSnackBar, private _dialog: MatDialog) {
    this.refresh();
  }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();

    this.mode = 'create';
    this.title = 'New Affiliation';
    this.subTitle = 'AO Encoder';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      this.refresh();
    });
  }

  refresh() {
    this._service.getRequests().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'requestDate': return new Date(item.requestedDate);
          default: return item[property];
        }
      };
    });
  }

  getStatus() {
    return 'DRAFT';
  }
}
