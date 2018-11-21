import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { BranchFormModalComponent } from '../modal/branch-form-modal/branch-form-modal.component';
import { BranchFormService } from '../forms/branch-form/branch-form.service';
import { MidListModalComponent } from '../modal/mid-list-modal/mid-list-modal.component';

export interface BranchDisplayInfo {
  Id: number;
  // BranchName: String;
  DBAAddress: String;
  DBAName: String;


}
const ELEMENT_DATA: BranchDisplayInfo[] = [
  { Id: 1, DBAName: 'AldoMegamall', DBAAddress: 'Mandaluyong' },
  { Id: 2, DBAName: 'Bench', DBAAddress: 'Mandaluyong' }
];

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit, AfterViewInit {
  @Input() detailsRoute: string;
  @Input() newAffiliationId: number;

  displayedColumns: string[] = ['DBAName', 'DBAAddress', 'Attachment'];
  dataSource: Object[];

  mode: string;

  outlet: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private _dialog: MatDialog,
    private _branchService: BranchFormService,
    private _changeDetectRef: ChangeDetectorRef
  ) {
    this.route.data
      .subscribe((data: { detailsRoute: string }) => {
        this.detailsRoute = data.detailsRoute;
        this.outlet = this.route.outlet;
      });
  }

  ngOnInit() {
    // this.mode = this.route.snapshot.paramMap.get('mode');
    // if (this.newAffiliationId === 0) {
    //   this.dataSource = [];
    // } else {
    //   this._branchService.getByNewAffiliationId(this.newAffiliationId).subscribe(data => {
    //     this.dataSource = data;
    //   });
    // }
  }

  ngAfterViewInit() {
    this._branchService.getByNewAffiliationId(this.newAffiliationId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  private refresh() {
    this._branchService.getByNewAffiliationId(this.newAffiliationId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  addBranch() {
    const dialog = this._dialog.open(BranchFormModalComponent, {
      width: '98%',
      height: 'auto',
      data: {
        newAffiliationId: this.newAffiliationId
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  update(branch) {
    const dialog = this._dialog.open(BranchFormModalComponent, {
      width: '98%',
      height: 'auto',
      data: {
        branch: branch,
        branchId: branch['id']
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }

  delete(id) {
    if (confirm('Are you sure?')) {
      this._branchService.delete(id).subscribe(data => {
        this.refresh();
      });
    }
  }

  updateMid(id) {
    const dialog = this._dialog.open(MidListModalComponent, {
      width: '90%',
      height: 'auto',
      data: {
        branchId: id
      }
    });
  }
}
