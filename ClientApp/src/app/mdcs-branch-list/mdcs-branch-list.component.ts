import { Component, OnInit } from '@angular/core';
import { BranchListService } from '../branch-list/branch-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mdcs-branch-list',
  templateUrl: './mdcs-branch-list.component.html',
  styleUrls: ['./mdcs-branch-list.component.css'],
  providers: [BranchListService]
})
export class MdcsBranchListComponent implements OnInit {
  displayedColumns: string[] = ['DBAName', 'DBAAddress', 'Attachment'];
  dataSource: Object[];
  branchId: number;
  showInfo = false;
  private _requestId: number;
  constructor(private _route: ActivatedRoute, private _service: BranchListService) {
    this._requestId = +this._route.snapshot.params['id'];

    this._service.getByNewAffiliationId(this._requestId).subscribe(b => {
      this.dataSource = b.items;
    });
  }

  ngOnInit() {
  }

  getBranch(id) {
    this.branchId = id;
    setTimeout(r => {
      this.showInfo = true;
    }, 300);
  }

  backToList() {
    this.showInfo = false;
  }

}
