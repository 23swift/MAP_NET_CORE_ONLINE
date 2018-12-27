import { Component, OnInit, Input } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { supportsWebAnimations } from '@angular/animations/browser/src/render/web_animations/web_animations_driver';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RemarksModalComponent } from '../modal/remarks-modal/remarks-modal.component';
import { NewAffiliationRequestService } from '../services/new-affiliation-request.service';
import { MaefFormService } from '../forms/maef-form/maef-form.service';



@Component({
  selector: 'app-bdo-form-header',
  templateUrl: './bdo-form-header.component.html',
  styleUrls: ['./bdo-form-header.component.css']
})
export class BdoFormHeaderComponent implements OnInit {
  showApprovalOptions: boolean;
  showRequestFlowOptions: boolean;
  showCreateOptions: boolean;
  showWelcomeLetter: boolean;
  showCadencieProcessingButton: boolean;
  showPosProcessingButton: boolean;
  showPsCheckerButton: boolean;
  showMqrUserProcessingButton: boolean;
  showMdcsChecking: boolean;
  showPreScreen: boolean;
  newAffiliationId: number;
  @Input() mode: string;
  @Input() text: string;
  @Input() sub_text: string;
  @Input() submit: Function;
  @Input() disabled: boolean;

  constructor(private _route: ActivatedRoute, private _router: Router, private _snackBar: MatSnackBar,
    private _dialog: MatDialog, private _newAffiliationService: NewAffiliationRequestService, private _maefFormService: MaefFormService) {
    this._route.params.subscribe(param => {
      this.newAffiliationId = param['id'];
    });
  }

  ngOnInit() {
    this.showApprovalOptions = false;  // 8
    this.showRequestFlowOptions = false; // 7
    this.showCreateOptions = false;
    this.showWelcomeLetter = false;
    this.showCadencieProcessingButton = false;
    this.showPosProcessingButton = false;
    this.showPsCheckerButton = false;
    this.showMqrUserProcessingButton = false;
    this.showMdcsChecking = false;
    this.showPreScreen = false;

    this.mode = this.mode ? this.mode : 'create';

    if (this._router.url !== '/home') {
      if (this.mode.match(/approver/i)) {
        this.showApprovalOptions = true;
      }
      if (this.mode.match(/aoChecker/i) /*|| this.mode.match(/approval/)*/) {
        this.showRequestFlowOptions = true;
      }
      if (this.mode.match(/create/i)) {
        this.showCreateOptions = true;
      }
      if (this.mode.match(/mdmUser/i)) {
        this.showWelcomeLetter = true;
      }
      if (this.mode.match(/forCadencie/i)) {
        this.showCadencieProcessingButton = true;
      }
      if (this.mode.match(/forPos/i)) {
        this.showPosProcessingButton = true;
      }
      if (this.mode.match(/forPsChecker/i)) {
        this.showPsCheckerButton = true;
      }
      if (this.mode.match(/mqrUser/i)) {
        this.showMqrUserProcessingButton = true;
      }
      if (this.mode.match(/forMdcsChecking/i)) {
        this.showMdcsChecking = true;
      }
      if (this.mode.match(/forPreScreening/)) {
        this.showPreScreen = true;
      }
      if (this.mode.match(/mauOfficer/i)) {
        this.showRequestFlowOptions = true;
      }
      if (this.mode.match(/mauEncoder/i)) {
        this.showRequestFlowOptions = true;
      }
    }
  }

  submitToChecker() {
    if (this.disabled) {
      this._snackBar.open('Submit to Request', 'FAILED: Incomplete Request Details!', {
        duration: 2000
      });
    } else {
      this.submit();
    }
  }

  returntoAO(): void {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
        newAffiliationId : this.newAffiliationId,
        action : 'Return To AO'
      }
    });

    dialog.afterClosed().subscribe(d => {
      this._newAffiliationService.returnToAoEncoder(this.newAffiliationId).subscribe(dd => {
        const snackBarRef = this._snackBar.open('Request', 'Returned', {
          duration: 1000
        });

        snackBarRef.afterDismissed().subscribe(s => {
          this._router.navigateByUrl('/home/aoChecker');
        })
      });
    });
  }

  submittoApprover(): void {
    this._maefFormService.SubmitToApprover(this.newAffiliationId).subscribe(data => {
      const snackBarRef = this._snackBar.open('Submitted To Approver', 'Saved', {
        duration: 1000
      });
    });
  }


  returntoMAMO(): void {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
      newAffiliationId : this.newAffiliationId,
      action : 'Return To MAMO'
    }
    });

    dialog.afterClosed().subscribe(d => {
    });
  }

  decline(): void {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
        newAffiliationId : this.newAffiliationId,
        action : 'Decline'
      }
    });

    dialog.afterClosed().subscribe(d => {

    });   
  }

  approve(): void {
    this._maefFormService.Approve(this.newAffiliationId).subscribe(data => {
      const snackBarRef = this._snackBar.open('Approved', 'Saved', {
        duration: 1000      
    });
  });   
  }

}
