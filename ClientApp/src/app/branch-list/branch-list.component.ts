import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { BranchFormModalComponent } from '../modal/branch-form-modal/branch-form-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal/delete-modal.component';
import { BranchListService } from './branch-list.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css'],
  providers: [BranchListService]
})
export class BranchListComponent implements OnInit, AfterViewInit {
  @Input() detailsRoute: string;
  @Input() newAffiliationId: number;
  @Input() userGroup: string;

  displayedColumns: string[] = ['DBAName', 'DBAAddress', 'Attachment'];
  dataSource: Object[];
  branchAddModel: Object;

  mode: string;

  outlet: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private _dialog: MatDialog,
    private _branchService: BranchListService,
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
    this.refresh();
  }

  private refresh() {
    this._branchService.getByNewAffiliationId(this.newAffiliationId).subscribe(data => {
      this.dataSource = data;

      if (this.dataSource.length > 0) {
        this._branchService.getBranchAutoPopulateFields(this.dataSource[0]['id']).subscribe(branchData => {
          this.branchAddModel = branchData;
          this.branchAddModel['newAffiliationId'] = this.newAffiliationId;
        });
      } else {
        this.branchAddModel = {
          newAffiliationId: this.newAffiliationId
        };
      }

      this._changeDetectRef.detectChanges();
    });
  }

  addBranch() {
    const dialog = this._dialog.open(BranchFormModalComponent, {
      width: '98%',
      height: 'auto',
      data: {
        branch: this.branchAddModel,
        newAffiliationId: this.newAffiliationId,
        userGroup: this.userGroup
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
        branchId: branch['id'],
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
        delete: this._branchService.delete(id)
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.refresh();
    });
  }
}
