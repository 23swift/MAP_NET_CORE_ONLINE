import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AoEncoderService } from './ao-encoder.service';

@Component({
  selector: 'app-ao-encoder-step',
  templateUrl: './ao-encoder.component.html',
  styleUrls: ['./ao-encoder.component.css'],
  providers: [AoEncoderService]
})
export class AoEncoderComponent implements OnInit {
  isLinear = false;
  isOptional = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  title = 'New Affiliation';
  subTitle = 'DRAFT';
  mode: string;
  status = 'done';
  newAffiliationId = 0;
  isBranch = false;
  isOif = false;
  isPos = false;
  isDocumentChecklist = false;

  //  completed:boolean=false;
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
    private _router: Router, private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.mode = this.route.snapshot.params['mode'];
    this.isOptional = true;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  public completed(stepper: MatStepper, form: string) {
    this.clearUrl();

    if (form === 'oif') {
      this.isOif = true;
    } else if (form === 'pos') {
      this.isPos = true;
    } else if (form === 'docs') {
      this.isDocumentChecklist = true;
    } else if (form === 'branch') {
      this.isBranch = true;
    }

    stepper.selected.completed = true;
    stepper.next();

    return true;
  }

  getNewAffiliationId(id) {
    this.newAffiliationId = id;
  }

  clearUrl() {
    const parentRoute = this._router.url.split('/(')[0];
    if (parentRoute) {
      this._router.navigateByUrl(`${parentRoute}`);
    }
  }

  Submit() {
    const snackBarSub = this._snackBar.open('New Affiliation Request!', 'Submitted', {
      duration: 2000
    });

    snackBarSub.afterDismissed().subscribe(() => {
      this._router.navigateByUrl('/');
    });
  }
}
