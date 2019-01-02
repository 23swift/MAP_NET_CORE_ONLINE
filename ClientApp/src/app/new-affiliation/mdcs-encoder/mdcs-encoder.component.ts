import { Component, OnInit } from '@angular/core';
import { MdcsEncoderService } from './mdcs-encoder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-mdcs-encoder',
  templateUrl: './mdcs-encoder.component.html',
  styleUrls: ['./mdcs-encoder.component.css'],
  providers: [MdcsEncoderService]
})
export class MdcsEncoderComponent implements OnInit {
  title: string;
  subTitle: string;
  mode: string;
  newAffiliationId: number;
  showHeader: boolean;

  constructor(private _newAffiliationService: NewAffiliationRequestService, private _snackBar: MatSnackBar,
    private _router: Router, private _route: ActivatedRoute, private _requestService: RequestService) {
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

  getNewAffiliationId(id) {
    this.newAffiliationId = id;
  }
  
  submit() {
    this._newAffiliationService.updateRequestForMdcsEncoder(this.newAffiliationId).subscribe(x => {
      const snackBarSub = this._snackBar.open('New Affiliation Request!', 'Submitted', {
        duration: 2000
      });

      snackBarSub.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/home/mdcsEncoder');
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
