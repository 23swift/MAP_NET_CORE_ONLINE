import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BranchListService } from '../branch-list/branch-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mqr-branch-list',
  templateUrl: './mqr-branch-list.component.html',
  styleUrls: ['./mqr-branch-list.component.css'],
  providers: [BranchListService]
})
export class MqrBranchListComponent implements OnInit {
  @Input() displayMode: boolean = true;
  @Input() update: boolean;
  @Input() showWaive: boolean;
  displayedColumns: string[] = ['DBAName', 'DBAAddress', 'Attachment'];
  dataSource: Object[];
  branchId: number;
  showInfo = false;
  branchCounter: number;
  private _requestId: number;

  constructor(private _route: ActivatedRoute, private _service: BranchListService) {
    this._requestId = +this._route.snapshot.params['id'];
    this.branchCounter = 0;

    this._service.getByNewAffiliationId(this._requestId).subscribe(b => {
      this.dataSource = b;
    });
  }

  ngOnInit() {
    this.update = true
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
