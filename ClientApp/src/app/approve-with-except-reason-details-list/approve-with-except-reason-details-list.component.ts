import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ApproveWithExceptReasonDetailsListService } from './approve-with-except-reason-details-list.service';
import { MatDialog } from '@angular/material';
import { ApproveWithExceptReasonDetailsModalComponent } from '../modal/approve-with-except-reason-details-modal/approve-with-except-reason-details-modal.component';
import { FieldType } from '@ngx-formly/core';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';

@Component({
  selector: 'app-approve-with-except-reason-details-list',
  templateUrl: './approve-with-except-reason-details-list.component.html',
  styleUrls: ['./approve-with-except-reason-details-list.component.css'],
  providers: [ApproveWithExceptReasonDetailsListService]
})
export class ApproveWithExceptReasonDetailsListComponent extends FieldType implements OnInit {
  displayedColumns: string[];
  dataSource: Object[];
  //@Input() displayMode: boolean;
  //@Input() userGroup: string;
  constructor(private _service: ApproveWithExceptReasonDetailsListService, private _dialog: MatDialog, private _changeDetectRef: ChangeDetectorRef) {
    super();
   }

  ngOnInit() {
    this.displayedColumns = this._service.getTableFields();
    //this.dataSource = this._service.get();
    this._service.getByAppExId(this.model['id']).subscribe(data => {
      this.dataSource = data.items;
     // console.log(data.items);
    });
  }

  addExDetails() {
    const dialog = this._dialog.open(ApproveWithExceptReasonDetailsModalComponent, {
      width: '60%',
      data: {
       maefId: this.model['id']
      }
    });

      dialog.afterClosed().subscribe(data => {
        this._service.getByAppExId(this.model['id']).subscribe(data => {
          this.dataSource = data.items;
        });
      });

  }

  update(appex) {
    const dialog = this._dialog.open(ApproveWithExceptReasonDetailsModalComponent, {
      width: '60%',
      data: {
        appex: appex
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
    this._service.getByAppExId(this.model['id']).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

}


