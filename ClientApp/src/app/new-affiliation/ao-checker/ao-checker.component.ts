import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatStepper, MatDialog } from '@angular/material';
import { AoCheckerService } from './ao-checker.service';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { RemarksModalComponent } from '../../modal/remarks-modal/remarks-modal.component';
import { RemarksService } from '../../remarks/remarks.service';


@Component({
  selector: 'app-ao-checker',
  templateUrl: './ao-checker.component.html',
  styleUrls: ['./ao-checker.component.css'],
  providers: [AoCheckerService]
})
export class AoCheckerComponent implements OnInit {
  isLinear = false;
  isOptional = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  title = 'New Affiliation';
  subTitle = 'FOR AO CHECKER REVIEW';
  mode: string;
  status = 'done';
  newAffiliationId = 0;
  isBranch = false;
  isOif = false;
  isPos = false;
  isDocumentChecklist = false;
  dataSource: Object[];

  constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute,
    private _router: Router, private _snackBar: MatSnackBar, private _newAffiliationService: NewAffiliationRequestService, private _dialog: MatDialog, private _remarksService: RemarksService
  ) { }

  ngOnInit() {
    this.mode = 'aoChecker';
    // this.isOptional = true;
  }

  public completed(stepper: MatStepper, form) {
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

  clearUrl() {
    const parentRoute = this._router.url.split('/(')[0];
    if (parentRoute) {
      this._router.navigateByUrl(`${parentRoute}`);
    }
  }

  getNewAffiliationId(id) {
    this.newAffiliationId = id;
  }

  Submit() {
    this._newAffiliationService.updateRequestForAoChecker(this.newAffiliationId).subscribe(x => {
      const snackBarSub = this._snackBar.open('New Affiliation Request!', 'Submitted', {
        duration: 2000
      });

      snackBarSub.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/home/aoChecker');
      });
    });
  }

  selectionChange($event: StepperSelectionEvent) {
    if ($event.selectedIndex === 1) {
      this.isOif = false;
      this.isPos = false;
    }
    if ($event.selectedIndex === 2) {
      this.isOif = true;
    }
    if ($event.selectedIndex === 3) {
      this.isPos = true;
    }
  }


}
