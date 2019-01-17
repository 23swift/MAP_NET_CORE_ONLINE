import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ApproveWithReqReasonListMqrService } from './approve-with-req-reason-list-mqr.service';
import { MatDialog } from '@angular/material';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { ApproveWithReqReasonMqrFormModalComponent } from '../modal/approve-with-req-reason-mqr-form-modal/approve-with-req-reason-mqr-form-modal.component';

@Component({
  selector: 'app-approve-with-req-reason-list-mqr',
  templateUrl: './approve-with-req-reason-list-mqr.component.html',
  styleUrls: ['./approve-with-req-reason-list-mqr.component.css'],
  providers: [ApproveWithReqReasonListMqrService]
})
export class ApproveWithReqReasonListMqrComponent implements OnInit {

  displayedColumns: string[];
  dataSource: Object[];
  maefId: number;
  
  private newAffiliationId: number;

  constructor(private _service: ApproveWithReqReasonListMqrService, private _dialog: MatDialog, 
              private _changeDetectRef: ChangeDetectorRef, private _route: ActivatedRoute)
  {
    this.newAffiliationId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.displayedColumns = ['awrsMqrRequirement', 'awrsRemarks', 'awrsMqrRemarks', 'chkAwrsComplied','Action'];
    this.getDetails(this.newAffiliationId);
  }

  getDetails(id) { 
    this._service.getByAppReqId(id).subscribe(data => {
      this.dataSource = data.items;
      this.maefId = data.items[0].maefId;
    });
  }

  addReqReason() {
    const dialog = this._dialog.open(ApproveWithReqReasonMqrFormModalComponent, {
      width: '60%',
      data: {
        maefId: this.maefId
      }
    });

    dialog.afterClosed().subscribe(data => {
      this._service.getByAppReqId(this.newAffiliationId).subscribe(data => {
        this.dataSource = data.items;
        this._changeDetectRef.detectChanges();
      });
    });
  }

  update(appreq) {
    const dialog = this._dialog.open(ApproveWithReqReasonMqrFormModalComponent, {
      width: '60%',
      data: {
        appreq: appreq
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
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

  private refresh() {
    this._service.getByAppReqId(this.newAffiliationId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

}
