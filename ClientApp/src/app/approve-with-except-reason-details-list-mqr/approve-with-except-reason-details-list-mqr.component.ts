import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FieldType } from '@ngx-formly/core';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { ApproveWithExceptReasonDetailsListMqrService } from './approve-with-except-reason-details-list-mqr.service';
import { ApproveWithExceptReasonMqrDetailsModalComponent } from '../modal/approve-with-except-reason-mqr-details-modal/approve-with-except-reason-mqr-details-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approve-with-except-reason-details-list-mqr',
  templateUrl: './approve-with-except-reason-details-list-mqr.component.html',
  styleUrls: ['./approve-with-except-reason-details-list-mqr.component.css'],
  providers: [ApproveWithExceptReasonDetailsListMqrService]
})
export class ApproveWithExceptReasonDetailsListMqrComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Object[];
  newAffiliationId: number;
  maefId: number;
  constructor(private _service: ApproveWithExceptReasonDetailsListMqrService,
    private _dialog: MatDialog, private _changeDetectRef: ChangeDetectorRef, private _route: ActivatedRoute) {
    this.newAffiliationId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.displayedColumns = ['awerdMqrDate', 'awerdMqrRequirement', 'awerdRemarks', 'awerdMqrRemarks', 'Action'];
    this.getDetails(this.newAffiliationId);
  }

  addExDetails() {
    const dialog = this._dialog.open(ApproveWithExceptReasonMqrDetailsModalComponent, {
      width: '60%',
      data: {
        maefId: this.maefId
      }
    });

    dialog.afterClosed().subscribe(data => {
      this._service.getByAppExId(this.maefId).subscribe(data => {
        this.dataSource = data.items;
        this._changeDetectRef.detectChanges();
      });
    });

  }

  update(appex) {
    const dialog = this._dialog.open(ApproveWithExceptReasonMqrDetailsModalComponent, {
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
    this._service.getByAppExId(this.maefId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  getDetails(id) {
    this._service.getByAppExId(id).subscribe(data => {
      this.dataSource = data.items;
      this.maefId = data.items[0].maefId;
    });
  }
}
