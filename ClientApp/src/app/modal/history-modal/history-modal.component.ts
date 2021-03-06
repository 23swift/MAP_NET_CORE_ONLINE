import { Component, OnInit, Inject } from '@angular/core';
import { HistoryModalService } from './history-modal.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.css'],
  providers: [HistoryModalService]
})
export class HistoryModalComponent implements OnInit {
  history: Observable<any>;
  historyDetailed: Observable<any>;
  historyId: number;
  panelOpenState: Boolean;
  constructor(private _modalRef: MatDialogRef<HistoryModalComponent>, private _service: HistoryModalService,
    @Inject(MAT_DIALOG_DATA)public modalData: any) {
      this.history = this._service.getByRequest(modalData['requestId']);
     // this.historyDetailed = this._service.getDetailedByRequest(modalData['requestId']);
      console.log(this.history);
    }

  ngOnInit() {
  }

  getDetailed(id) {
    this.panelOpenState = true;
    this.historyDetailed = this._service.getDetailedByHistoryId(id);
  }

  test() {
    this.panelOpenState = true;
    console.log('vfe');
 }

}
