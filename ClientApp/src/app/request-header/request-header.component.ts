import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HistoryModalComponent } from '../modal/history-modal/history-modal.component';
import { RequestHeaderService } from './request-header.service';
import { ActivatedRoute } from '@angular/router';
import { DropDownService } from '../services/drop-down.service';
import { forkJoin } from 'rxjs';


interface IRequestHeader {
  referenceNumber: string;
  aoCode: string;
  ownership: string;
  requestedDate: Date;
  legalName: string;
}
@Component({
  selector: 'app-request-header',
  templateUrl: './request-header.component.html',
  styleUrls: ['./request-header.component.css'],
  providers: [RequestHeaderService]
})
export class RequestHeaderComponent implements OnInit {
  dateToday = new Date();
  model: IRequestHeader;
  ownershipList = [];
  requestId: number;
  constructor(private _dialog: MatDialog, private _service: RequestHeaderService, private _router: ActivatedRoute,
    private _dropDownService: DropDownService) {
    this._router.params.subscribe(param => {
      this.requestId = +param['id'];
      forkJoin([
        this._service.get(param['id']),
        this._dropDownService.getDropdown('OW')
      ]).subscribe(fjData => {
        this.model = fjData[0];
        this.ownershipList = fjData[1];
        this.model.ownership = this.ownershipList.find(o => o.code === this.model.ownership).value;
      });
    });
  }

  ngOnInit() {

  }

  openHistory() {
    this._dialog.open(HistoryModalComponent, {
      width: '60%',
      data: {
        requestId: this.requestId
      }
    });
  }


}
