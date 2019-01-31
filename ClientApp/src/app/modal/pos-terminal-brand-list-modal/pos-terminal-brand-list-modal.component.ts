import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { PosTerminalBrandListModalService } from './pos-terminal-brand-list-modal.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PosTerminalFormModalComponent } from '../pos-terminal-form-modal/pos-terminal-form-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DropDownService } from 'src/app/services/drop-down.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pos-terminal-brand-list-modal',
  templateUrl: './pos-terminal-brand-list-modal.component.html',
  styleUrls: ['./pos-terminal-brand-list-modal.component.css']
})
export class PosTerminalBrandListModalComponent implements OnInit {
  displayedColumns;
  dataSource;
  posId: number;
  @Input() showUpdate = true;
  @Input() showAdd = true;
  @Input() showDelete = true;
  @Input() userGroup:string;
  terminalBrandList = [];
  terminalTypeList = [];
  terminalModelList = [];
  simTypeList = [];

  constructor(private _terminalService: PosTerminalBrandListModalService, private _dialog: MatDialog,
    private _route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _changeDetectRef: ChangeDetectorRef,
    private _dropDownService: DropDownService) {
      this.posId = this.dialogData['posId'];
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
        posTerminal: posTerminal,
        userGroup: this.userGroup
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
