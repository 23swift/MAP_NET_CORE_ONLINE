import { Component, OnInit } from '@angular/core';
import { MdcsCheckerService } from './mdcs-checker.service';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-mdcs-checker',
  templateUrl: './mdcs-checker.component.html',
  styleUrls: ['./mdcs-checker.component.css'],
  providers: [MdcsCheckerService]
})
export class MdcsCheckerComponent implements OnInit {
  title: string;
  subTitle: string;
  mode: string;
  options = {};
  showHeader: boolean;
  newAffiliationId: number;

  constructor(private _newAffiliationService: NewAffiliationRequestService, private _snackBar: MatSnackBar,
    private _router: Router, private _requestService: RequestService, private _route: ActivatedRoute) {
      this.newAffiliationId = +this._route.snapshot.params['id'];
    }

  ngOnInit() {
    this.showHeader = false;

    this._requestService.getStatus(this.newAffiliationId).subscribe(s => {
      this.title = 'New Affiliation';
      this.showHeader = true;
      if (s === 3) {
        this.subTitle = 'FOR ENCODING';
        this.mode = 'forMdcsChecking';
      } else {
        this.subTitle = 'FOR ENCODER CHECKER REVIEW';
        this.mode = 'forPreScreening';
      }
    });
  }

  submit() {
    this._newAffiliationService.updateRequestForMdcsChecker(this.newAffiliationId).subscribe(x => {
      const snackBarSub = this._snackBar.open('New Affiliation Request!', 'Submitted', {
        duration: 2000
      });

      snackBarSub.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/home/mdcsChecker');
      });
    }, err => {
      if (err['status'] === 400) {
        const snackBarSub = this._snackBar.open('One or More Branches Were Not Updated', 'Failed', {
          duration: 2000
        });
      }
    });
  }
}
