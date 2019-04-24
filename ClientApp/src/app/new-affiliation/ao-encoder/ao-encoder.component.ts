import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatStepper } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AoEncoderService } from './ao-encoder.service';
import { BranchListService } from 'src/app/branch-list/branch-list.service';
import { OifFormModalService } from 'src/app/modal/oif-form-modal/oif-form-modal.service';
import { PosFormModalService } from 'src/app/modal/pos-form-modal/pos-form-modal.service';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { DocumentCheckListService } from 'src/app/document-check-list/document-check-list.service';
import { HistoryModalComponent } from 'src/app/modal/history-modal/history-modal.component';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { RemarksService } from '../../remarks/remarks.service';

@Component({
  selector: 'app-ao-encoder-step',
  templateUrl: './ao-encoder.component.html',
  styleUrls: ['./ao-encoder.component.css'],
  providers: [AoEncoderService, BranchListService, OifFormModalService, PosFormModalService, DocumentCheckListService]
})
export class AoEncoderComponent implements OnInit {
  isLinear = false;
  title = 'New Affiliation';
  subTitle = 'DRAFT';
  mode: string;
  status = 'done';
  newAffiliationId = 0;
  isBranch = false;
  isOif = false;
  isPos = false;
  isDocumentChecklist = false;
  isDone = false;
  reqStatus: number;

  //  completed:boolean=false;
  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,
    private _router: Router, private _snackBar: MatSnackBar,
    private _branchService: BranchListService, private _oifService: OifFormModalService,
    private _posService: PosFormModalService,
    private _newAffiliationService: NewAffiliationRequestService,
    private _documentChecklistService: DocumentCheckListService,
    private _dialog: MatDialog,
    private _remarksService: RemarksService
  ) { 
    this.newAffiliationId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : 0;
  
  }

  ngOnInit() {
    if (this.newAffiliationId == 0 )
    {
      this.subTitle ='DRAFT';
      this.mode = 'create';      
    }
    else
    {
      this._remarksService.getRequestStatus(this.newAffiliationId).subscribe(data => {
        console.log(data);
        this.reqStatus = +data;
        if (this.reqStatus == 26) {   //returnRequestChecker
            this.subTitle = 'RETURNED';
            this.mode = 'returnRequestChecker';
        }
        else if (this.reqStatus == 27) {   //returnRequestMAMO
            this.subTitle = 'RETURNED';
            this.mode = 'returnRequestMAMO';
        }
        else if (this.reqStatus == 1) {   //returnRequestMAMO
          this.subTitle = 'DRAFT';
          this.mode = 'create';
      }

    });      
    }


  }

  public completed(stepper: MatStepper, form: string) {
    this.clearUrl();

    if (form === 'cust') {
      // FOR FORM CUSTOMER PROFILE
      if (this.newAffiliationId) {
        this.isBranch = true;

        stepper.selected.completed = true;
        stepper.next();
      } else {
        this._snackBar.open('NEXT', 'FAILED: No Existing Customer Profile',
          {
            duration: 1000
          });
      }
    } else if (form === 'branch') {
      // FOR FORM BRANCH
      this._branchService.getByNewAffiliationId(this.newAffiliationId).subscribe(data => {
        if (data.length) {
          this.isOif = true;

          stepper.selected.completed = true;
          stepper.next();
        } else {
          this._snackBar.open('NEXT', 'FAILED: No Existing Branch',
            {
              duration: 1000
            });
        }
      });
    } else if (form === 'oif') {
      this._oifService.validateByNewAffiliationId(this.newAffiliationId).subscribe(isValid => {
        if (isValid) {
          // FOR FORM OIF
          this.isPos = true;

          stepper.selected.completed = true;
          stepper.next();
        } else {
          this._snackBar.open('NEXT', 'FAILED: One or more Branch has no OIF',
            {
              duration: 1000
            });
        }
      });
    } else if (form === 'pos') {
      this._posService.validateByNewAffiliationId(this.newAffiliationId).subscribe(isValid => {
        if (isValid) {
          // FOR FORM POS
          this.isDocumentChecklist = true;

          stepper.selected.completed = true;
          stepper.next();
        } else {
          this._snackBar.open('NEXT', 'FAILED: One or more Branch has no POS/Terminal Details', {
            duration: 1000
          });
        }
      });
    } else if (form === 'docs') {
      // FOR DOCUMENTS
      this._documentChecklistService.validateByNewAffiliationId(this.newAffiliationId).subscribe(d => {
        if (d) {
          this.isDone = true;

          stepper.selected.completed = true;
          stepper.next();
        } else {
          this._snackBar.open('NEXT', 'FAILED:  One or more Documents were updated', {
            duration: 1000
          });
        }
      });
    }

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
    this._newAffiliationService.updateRequestForAoEncoder(this.newAffiliationId).subscribe(x => {
      const snackBarSub = this._snackBar.open('New Affiliation Request!', 'Submitted', {
        duration: 2000
      });

      snackBarSub.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/home');
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

  openHistory() {
    this._dialog.open(HistoryModalComponent, {
      width: '60%',
      height: '60%',
      data: {
        requestId: this.newAffiliationId
      }
    });
  }
}
