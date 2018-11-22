import { Component, OnInit, Input, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BranchFormModalService } from '../modal/branch-form-modal/branch-form-modal.service';

export interface BranchDisplayInfo {
  Id: number;
  // BranchName: String;
  DBAAddress: String;
  DBAName: String;
}

@Component({
  selector: 'app-branch-list-attachment-pos',
  templateUrl: './branch-list-attachment-pos.component.html',
  styleUrls: ['./branch-list-attachment-pos.component.css'],
  providers: [BranchFormModalService]
})
export class BranchListAttachmentPOSComponent implements OnInit, AfterContentInit {
  @Input() newAffiliationId: number;
  branchId = 0;
  showBranchList = true;
  displayedColumns: string[] = ['DBAName', 'DBAAddress', 'Attachment'];
  dataSource = [];

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private _branchService: BranchFormModalService,
    private _changeDetectRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this._branchService.getByNewAffiliationId(this.newAffiliationId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  getPos(id) {
    this.branchId = id;
    this.showBranchList = false;
  }

  private getItem(Id) {
    this.router.navigate([{ outlets: { primary: '', branchPOS: 'POS' } }]);
  }

  backToList() {
    this.showBranchList = true;
  }
}
