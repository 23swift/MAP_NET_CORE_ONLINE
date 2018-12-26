import { Component, OnInit } from '@angular/core';
import { MdcsCheckerService } from './mdcs-checker.service';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
  newAffiliationId: number;

  constructor(private _newAffiliationService: NewAffiliationRequestService, private _snackBar: MatSnackBar,
    private _router: Router) { }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'FOR ENCODER CHECKER REVIEW';
    this.mode = 'forPreScreening';
  }

  getNewAffiliationId(id) {
    this.newAffiliationId = id;
  }

  submit() {
    this._newAffiliationService.updateRequestForMdcsChecker(this.newAffiliationId).subscribe(x => {
      const snackBarSub = this._snackBar.open('New Affiliation Request!', 'Submitted', {
        duration: 2000
      });

      snackBarSub.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/home/mdcsChecker');
      });
    });
  }
}
