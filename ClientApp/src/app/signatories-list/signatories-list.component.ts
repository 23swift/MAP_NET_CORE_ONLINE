import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { SignatoriesListService } from './signatories-list.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SignatoriesFormModalComponent } from '../modal/signatories-form-modal/signatories-form-modal.component';
import { ActivatedRoute } from '@angular/router';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';

@Component({
  selector: 'app-signatories-list',
  templateUrl: './signatories-list.component.html',
  styleUrls: ['./signatories-list.component.css'],
  providers: [SignatoriesListService]
})
export class SignatoriesListComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Object[];
  @Input() displayMode: boolean;
  @Input() userGroup: string;
  @Input() customerProfileId: number;

  constructor(private _signatoriesService: SignatoriesListService, private _dialog: MatDialog,
    private _changeDetectRef: ChangeDetectorRef, private _route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this._route.params.subscribe(params => {
      if (params['id']) {
        this._signatoriesService.getByCustomerId(params['id']).subscribe(data => {
          this.dataSource = data.items;
        });
      }
    });
  }

  ngOnInit() {
    this.displayedColumns = this._signatoriesService.getTableFields();
    // this.dataSource = this._signatoriesService.get();
  }

  update(signatory) {
    const dialog = this._dialog.open(SignatoriesFormModalComponent, {
      width: '60%',
      data: {
        signatory: signatory,
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
        delete: this._signatoriesService.delete(id)
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  addSignatory() {
    if (this.customerProfileId) {
      const dialog = this._dialog.open(SignatoriesFormModalComponent, {
        width: '60%',
        data: {
          customerProfileId: this.customerProfileId,
          userGroup: this.userGroup
        }
      });

      dialog.afterClosed().subscribe(data => {
        this.refresh();
      });
    } else {
      this._snackBar.open('Signatory\'s Details', 'FAILED: No Customer Profile Provided', {
        duration: 2000
      });
    }
  }

  getApplicableTo(value) {
    return this._signatoriesService.getApplicableTo().find(a => a.value === value).label;
  }

  private refresh() {
    this._signatoriesService.getByCustomerId(this.customerProfileId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }
}
