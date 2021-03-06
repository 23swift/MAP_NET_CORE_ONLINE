import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { PosListService } from './pos-list.service';
import { PosFormModalComponent } from '../modal/pos-form-modal/pos-form-modal.component';
import { PosTerminalBrandListModalComponent } from '../modal/pos-terminal-brand-list-modal/pos-terminal-brand-list-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { DropDownService } from '../services/drop-down.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pos-list',
  templateUrl: './pos-list.component.html',
  styleUrls: ['./pos-list.component.css'],
  providers: [PosListService]
})
export class PosListComponent implements OnInit {
  @Input() branchId: number;
  displayedColumns: string[];
  dataSource: Object[];
  @Input() showAdd: boolean;
  @Input() showMid?: boolean;
  @Input() showTerminalUpdate?: boolean;
  @Input() showTerminalAdd?: boolean;
  @Input() showDelete: boolean;
  @Input() displayMode?: boolean;
  @Input() userGroup: string;
  @Input() showTerminalDelete: boolean;
  @Input() showPrint: boolean;
  natureOfRequestList = [];

  constructor(private _posService: PosListService, private _route: ActivatedRoute, private _dialog: MatDialog,
    private _overlay: Overlay,
    private _changeDetectRef: ChangeDetectorRef,
    private _dropDownService: DropDownService) {
  }

  ngOnInit() {
    this.displayedColumns = this._posService.getTableFields();

    forkJoin([
      this._dropDownService.getDropdown('NR'),
      this._posService.getByBranch(this.branchId)
    ]).subscribe(fjData => {
      this.natureOfRequestList = fjData[0];
      this.dataSource = fjData[1].items;
    });
    //console.log(this.displayMode + 'pos list');
  }

  private refresh() {
    this._posService.getByBranch(this.branchId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  addPos() {
    const dialog = this._dialog.open(PosFormModalComponent, {
      width: '98%',
      height: 'auto',
      data: {
        branchId: this.branchId,
        showMid: this.showMid,
        showTerminalUpdate: this.showTerminalUpdate,
        showTerminalAdd: this.showTerminalAdd,
        displayMode: this.displayMode,
        showTerminalDelete: this.showTerminalDelete,
        userGroup: this.userGroup
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  updatePos(pos) {
    const dialog = this._dialog.open(PosFormModalComponent, {
      width: '98%',
      data: {
        pos: pos,
        branchId: this.branchId,
        posId: pos['id'],
        showMid: this.showMid,
        showTerminalUpdate: this.showTerminalUpdate,
        showTerminalAdd: this.showTerminalAdd,
        displayMode: this.displayMode,
        showTerminalDelete: this.showTerminalDelete,
        userGroup: this.userGroup,
        showPrint: this.showPrint != undefined ? this.showPrint : false
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  deleteItem(id) {
    const dialog = this._dialog.open(DeleteModalComponent, {
      width: '60%',
      data: {
        delete: this._posService.delete(id)
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  updateTerminal(posId) {
    this._dialog.open(PosTerminalBrandListModalComponent, {
      width: '90%',
      height: 'auto',
      data: {
        posId: posId
      }
    });
  }

  get dateRequested() {
    return new Date();
  }

  getNatureOfRequest(code) {
    return code ? this.natureOfRequestList.find(n => n.code === code).value : '';
  }
}
