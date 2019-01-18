import { Component, OnInit } from '@angular/core';
import { MdmUserService } from './mdm-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BranchListService } from 'src/app/branch-list/branch-list.service';

@Component({
  selector: 'app-mdm-user',
  templateUrl: './mdm-user.component.html',
  styleUrls: ['./mdm-user.component.css'],
  providers: [MdmUserService, BranchListService]
})
export class MdmUserComponent implements OnInit {
  mode: string;
  title: string;
  subTitle: string;
  requestId: number;
  displayMode: boolean;
  userGroup: string;
  dataSource: any;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _branchService: BranchListService) {
    this.requestId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.mode = 'mdmUser';
    this.title = 'New Affiliation';
    this.subTitle = 'APPROVED WITH EXCEPTIONS';
    this.displayMode = true;
    this.userGroup = 'mdmUser';
    this.dataSource = this._branchService.getByNewAffiliationId(this.requestId);
  }

  Submit() {
    const snackBarSub = this._snackBar.open('Welcome Letter Generated!', 'Success', {
      duration: 2000
    });

    snackBarSub.afterDismissed().subscribe(() => {
      this._router.navigateByUrl('/home/mdm');
    });
  }
}
