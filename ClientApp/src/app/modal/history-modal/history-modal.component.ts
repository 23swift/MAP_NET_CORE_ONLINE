import { Component, OnInit, Inject } from '@angular/core';
import { HistoryModalService } from './history-modal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-history-modal',
  templateUrl: './history-modal.component.html',
  styleUrls: ['./history-modal.component.css'],
  providers: [HistoryModalService]
})
export class HistoryModalComponent implements OnInit {
  history = [];
  constructor(private _modalRef: MatDialogRef<HistoryModalComponent>, private _service: HistoryModalService,
    @Inject(MAT_DIALOG_DATA)public modalData: any) {
      this._service.getByRequest(modalData['requestId']).subscribe(h => {
        console.log(h);
        this.history = h;
      });
    }

  ngOnInit() {
  }

}
