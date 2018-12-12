import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ApproveWithReqReasonListService } from './approve-with-req-reason-list.service';
import { MatDialog } from '@angular/material';
import { ApproveWithReqReasonFormModalComponent } from '../modal/approve-with-req-reason-form-modal/approve-with-req-reason-form-modal.component';
import { FieldType } from '@ngx-formly/core';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';


@Component({
  selector: 'app-approve-with-req-reason-list',
  templateUrl: './approve-with-req-reason-list.component.html',
  styleUrls: ['./approve-with-req-reason-list.component.css'],
  providers: [ApproveWithReqReasonListService]
})
export class ApproveWithReqReasonListComponent extends FieldType implements OnInit {
  displayedColumns: string[];
  dataSource: Object[];
  //@Input() displayMode: boolean;
  //@Input() userGroup: string;

  constructor(private _service: ApproveWithReqReasonListService, private _dialog: MatDialog, private _changeDetectRef: ChangeDetectorRef) {
    super();
   }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    //this.dataSource = this._service.get();
    this._service.getByAppReqId(this.model['id']).subscribe(data => {
      this.dataSource = data.items;
      console.log(data.items);
    });

  }

  addReqReason() {
    this._dialog.open(ApproveWithReqReasonFormModalComponent, {
      width: '60%',
      data: {
       maefId: this.model['id']
      }
    });
  }

  update(appreq) {
    const dialog = this._dialog.open(ApproveWithReqReasonFormModalComponent, {
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
    this._service.getByAppReqId(this.model['id']).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

}


