import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OifFormModalComponent } from '../modal/oif-form-modal/oif-form-modal.component';
import { BranchFormService } from '../forms/branch-form/branch-form.service';
import { BranchFormModalService } from '../modal/branch-form-modal/branch-form-modal.service';
export interface BranchDisplayInfo {
  Id: number;
  // BranchName: String;
  DBAAddress: String;
  DBAName: String;


}
const ELEMENT_DATA: BranchDisplayInfo[] = [
];
@Component({
  selector: 'app-branch-list-attachment',
  templateUrl: './branch-list-attachment.component.html',
  styleUrls: ['./branch-list-attachment.component.css'],
  providers: [BranchFormModalService]
})
export class BranchListAttachmentComponent implements OnInit, AfterContentInit {
  displayedColumns: string[] = ['DBAName', 'DBAAddress', 'Attachment'];
  dataSource: Object[];
  private _newAffValue: number;
  @Input() newAffiliationId: number;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private _dialog: MatDialog,
    private _branchService: BranchFormModalService,
    private _changeDetectRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this._branchService.getByNewAffiliationId(this.newAffiliationId).subscribe(data => {
      this.dataSource = data.items;
      this._changeDetectRef.detectChanges();
    });
  }

  private getItem(Id) {
    // this.router.navigateByUrl('OIF/'+Id);
    // this.router.navigate([{outlets: {branchOIF: 'OIF/'+Id}}]);
    this.router.navigate([{ outlets: { primary: '', branchOIF: 'OIF' } }]);
  }

  updateOif(branchId) {
    this._dialog.open(OifFormModalComponent, {
      width: '90%',
      height: 'auto',
      data: {
        branchId: branchId
      }
    });
  }
}
