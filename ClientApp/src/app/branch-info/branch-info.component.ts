import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../app-base/app-base.component';
import { BranchListService } from '../branch-list/branch-list.service';
import { BranchInfoService } from './branch-info.service';

@Component({
  selector: 'app-branch-info',
  templateUrl: './branch-info.component.html',
  styleUrls: ['./branch-info.component.css'],
  providers: [BranchListService, BranchInfoService]
})
export class BranchInfoComponent extends AppBaseComponent implements OnInit {
  // export class BranchInfoComponent implements OnInit {
  @Input() displayMode: boolean;
  @Input() showOif?= true;
  @Input() showPos?= true;
  @Input() showMid?= true;
  @Input() requestId: number;
  

  dataSource: Object[];

  constructor(public route: ActivatedRoute,
    public router: Router, private _branchService: BranchListService, private _branchInfoService: BranchInfoService) {
    super(route, router);



  }

  ngOnInit() {
    this._branchService.getByNewAffiliationId(this.requestId).subscribe(data => {
      this.dataSource = data.items;
      //console.log(this.requestId);
      console.log(data.items);
      //console.log(data.items['id'] + 'd');
    });
    //this.fields = this._branchInfoService.getBranchFields();
  }

  trackById(index, branch) {
    return branch.id;
  }

}
