import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { PosTerminalBrandListModalService } from './pos-terminal-brand-list-modal.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { PosTerminalFormModalComponent } from '../pos-terminal-form-modal/pos-terminal-form-modal.component';

@Component({
  selector: 'app-pos-terminal-brand-list-modal',
  templateUrl: './pos-terminal-brand-list-modal.component.html',
  styleUrls: ['./pos-terminal-brand-list-modal.component.css']
})
export class PosTerminalBrandListModalComponent implements OnInit {
  displayedColumns;
  dataSource;
  posId: number;
  @Input() showAdd?: boolean;
  showAddTerminal: boolean;

  constructor(private _terminalService: PosTerminalBrandListModalService, private _dialog: MatDialog,
    private _route: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _changeDetectRef: ChangeDetectorRef) {
      this.posId = this.dialogData['posId'];
      this._terminalService.getByPos(this.posId).subscribe(data => {
        this.dataSource = data.items;
      });
    }

  ngOnInit() {
    this.displayedColumns = this._terminalService.getTableFields();

    this._route.data.subscribe(data => {
      if (data['showAddTerminal'] !== undefined) {
        this.showAddTerminal = data['showAddTerminal'];
      } else {
        this.showAddTerminal = this.showAdd;
      }
    });


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
    if (confirm('Are you sure?')) {
      this._terminalService.delete(id).subscribe(data => {
        this.refresh();
      });
    }
  }

  getTerminalBrand(tb) {
    return this._terminalService.getTerminalBrand().find(t => t.value === tb).label;
  }

  getTerminalType(tt) {
    return this._terminalService.getTerminalType().find(t => t.value === tt).label;
  }

  getTerminalModel(tm) {
    return this._terminalService.getTerminalModel().find(t => t.value === tm).label;
  }
}
