import { Component, OnInit, ViewChild } from '@angular/core';
import { MauOfficerDashboardService } from './mau-officer-dashboard.service';
//import { IRequestDisplay } from '../../temp/interface/irequest-display';
import { MatDialogRef, MatDialog, MatSnackBar, MatSort, MatTableDataSource, MatTab } from '../../../../node_modules/@angular/material';
import { AoListModalComponent } from '../../modal/ao-list-modal/ao-list-modal.component';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { SearchModalComponent } from 'src/app/modal/search-modal/search-modal.component';

// const ElementData: IRequestDisplay[] =  [
//   {
//     Id: 1,
//     ReferenceNo: '000000110232018',
//     RequestedDate: '10/23/2018',
//     RequestType: 'New Affiliation',
//     BusinessName: 'Bench',
//     DBAName: 'DBA Name Test',
//     RequestedBy: 'Juan Dela Cruz',
//     RequestStatus: 'FOR EVALUATION',
//     TAT: '10 Hour(s)'
//   },
//   {
//     Id: 2,
//     ReferenceNo: '000000210302018',
//     RequestedDate: '10/30/2018',
//     RequestType: 'New Affiliation',
//     BusinessName: 'Bench',
//     DBAName: 'DBA Name Test',
//     RequestedBy: 'Juan Dela Cruz',
//     RequestStatus: 'FOR RE-EVALUATION',
//     TAT: '20 Hour(s)'
//   }
// ];

// export interface IRequestDisplay {
//   Id: number;
//   ReferenceNo: string;
//   RequestedDate: string;
//   RequestType: string;
//   BusinessName: string;
//   DBAName: string;
//   RequestedBy: string;
//   RequestStatus: string;
//   TAT: string;
// }



@Component({
  selector: 'app-mau-officer-dashboard',
  templateUrl: './mau-officer-dashboard.component.html',
  styleUrls: ['./mau-officer-dashboard.component.css'],
  providers: [MauOfficerDashboardService]
})
export class MauOfficerDashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  mode: string;
  title: string;
  subTitle: string;
  hasOwner: boolean;

  constructor(private _service: MauOfficerDashboardService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.displayedColumns = ['ReferenceNo', 'RequestedDate', 'RequestType',
      'BusinessName', 'DBAName', 'RequestedBy',
      'RequestStatus', 'TAT', 'Operation']
    
    this._service.Get().subscribe(x => {
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.sort = this.sort;
    });

    this.mode = '';
    this.title = '';
    this.subTitle = '';
  }

  editItem(id) {
    id = 1;
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
    const dialogRef = this._dialog.open(SearchModalComponent, {
      autoFocus: false,
      width: '40%'
    });
  }

  ownRequest(id) {
    id = 1;
    this._router.navigateByUrl('na/mauOfficer/' + id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
