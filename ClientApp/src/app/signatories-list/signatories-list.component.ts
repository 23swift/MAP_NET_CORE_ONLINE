import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { SignatoriesListService } from './signatories-list.service';
import { MatDialog } from '@angular/material';
import { SignatoriesFormModalComponent } from '../modal/signatories-form-modal/signatories-form-modal.component';
import { ActivatedRoute } from '@angular/router';

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
  @Input() customerProfileId: number;

  constructor(private _signatoriesService: SignatoriesListService, private _dialog: MatDialog,
    private _changeDetectRef: ChangeDetectorRef, private _route: ActivatedRoute) {
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
        signatory: signatory
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this._signatoriesService.delete(id).subscribe(data => {
        this.refresh();
      });
    }
  }

  addSignatory() {
    const dialog = this._dialog.open(SignatoriesFormModalComponent, {
      width: '60%',
      data: {
        customerProfileId: this.customerProfileId
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
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
