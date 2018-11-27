import { Component, OnInit, Input, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { OwnersListService } from './owners-list.service';
import { MatDialog, MatSnackBar } from '../../../node_modules/@angular/material';
import { OwnersFormModalComponent } from '../modal/owners-form-modal/owners-form-modal.component';
import { config } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';

@Component({
  selector: 'app-owners-list',
  templateUrl: './owners-list.component.html',
  styleUrls: ['./owners-list.component.css'],
  providers: [OwnersListService]
})
export class OwnersListComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Object[];
  @Input() displayMode: boolean;
  @Input() customerProfileId: number;

  constructor(private _ownerService: OwnersListService, private _dialog: MatDialog, private _changeDetectRef: ChangeDetectorRef,
    private _route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this._route.params.subscribe(params => {
      if (params['id']) {
        this._ownerService.getByCustomerId(params['id']).subscribe(data => {
          this.dataSource = data.items;
        });
      }
    });
  }

  ngOnInit() {
    this.displayedColumns = this._ownerService.getTableFields();
  }

  update(owner) {
    const dialog = this._dialog.open(OwnersFormModalComponent, {
      width: '60%',
      data: {
        owner: owner
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
        delete: this._ownerService.delete(id)
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  addOwner() {
    if (this.customerProfileId) {
      const dialog = this._dialog.open(OwnersFormModalComponent, {
        width: '60%',
        data: {
          customerProfileId: this.customerProfileId
        }
      });

      dialog.afterClosed().subscribe(data => {
        this.refresh();
      });
    } else {
      this._snackBar.open('Owner\'s Details', 'FAILED: No Customer Profile Provided', {
        duration: 2000
      });
    }
  }

  getTypeOfRelatedParty(value) {
    return this._ownerService.getTypeOfRelatedParty().find(r => r.value === value).label;
  }

  private refresh() {
    this._ownerService.getByCustomerId(this.customerProfileId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }
}
