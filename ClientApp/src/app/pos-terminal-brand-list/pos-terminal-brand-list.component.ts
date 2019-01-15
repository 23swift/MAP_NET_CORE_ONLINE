import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { PosTerminalBrandListService } from './pos-terminal-brand-list.service';
import { PosTerminalFormModalComponent } from '../modal/pos-terminal-form-modal/pos-terminal-form-modal.component';
import { DropDownService } from '../services/drop-down.service';
import { forkJoin } from 'rxjs';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';

@Component({
  selector: 'app-pos-terminal-brand-list',
  templateUrl: './pos-terminal-brand-list.component.html',
  styleUrls: ['./pos-terminal-brand-list.component.css'],
  providers: [PosTerminalBrandListService]
})
export class PosTerminalBrandListComponent implements OnInit {
  displayedColumns;
  dataSource;
  @Input() showUpdate = true;
  @Input() showAdd = true;
  @Input() showDelete = true;
  @Input() posId = 0;
  terminalBrandList = [];
  terminalTypeList = [];
  terminalModelList = [];
  simTypeList = [];

  constructor(private _terminalService: PosTerminalBrandListService, private _dialog: MatDialog,
    private _route: ActivatedRoute, 
    private _changeDetectRef: ChangeDetectorRef,
    private _dropDownService: DropDownService) {
      // if (this.dialogData['showTerminalUpdate'] !== undefined) {
      //   this.showUpdate = this.dialogData['showTerminalUpdate'];
      // }

      forkJoin([
        this._dropDownService.getDropdown('POSTB'),
        this._dropDownService.getDropdown('POSTT'),
        this._dropDownService.getDropdown('TBTM'),
        this._dropDownService.getDropdown('POSST'),
        this._terminalService.getByPos(this.posId)
      ]).subscribe(fjData => {
        this.terminalBrandList = fjData[0];
        this.terminalTypeList = fjData[1];
        this.terminalModelList = fjData[2];
        this.simTypeList = fjData[3];
        this.dataSource = fjData[4].items;
      });
    }

  ngOnInit() {
    this.displayedColumns = this._terminalService.getTableFields();
  }

  private refresh() {
    this._terminalService.getByPos(this.posId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  addTerminal() {
    const dialog = this._dialog.open(PosTerminalFormModalComponent, {
      width: '90%',
      data: {
        posId: this.posId
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  updateTerminal(posTerminal) {
    const dialog = this._dialog.open(PosTerminalFormModalComponent, {
      width: '50%',
      data: {
        posTerminal: posTerminal
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
        delete: this._terminalService.delete(id)
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  getTerminalBrand(tb) {
    return this.terminalBrandList.find(m => m.code === tb).value;
  }

  getTerminalType(tt) {
    return this.terminalTypeList.find(m => m.code === tt).value;
  }

  getTerminalModel(tm) {
    return this.terminalModelList.find(m => m.code === tm).value;
  }

  getSimType(st) {
    return this.simTypeList.find(m => m.code === st).value;
  }
}
