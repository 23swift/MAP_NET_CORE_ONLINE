import { Component, OnInit } from '@angular/core';
import { MdcsEncoderService } from './mdcs-encoder.service';
import { Router } from '@angular/router';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { MatSnackBar } from '@angular/material';

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
  constructor(private _newAffiliationService: NewAffiliationRequestService, private _snackBar: MatSnackBar,
    private _router: Router) { }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'FOR ENCODING';
    this.mode = 'forMdcsChecking';
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
