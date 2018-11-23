import { Component, OnInit, Input } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { supportsWebAnimations } from '@angular/animations/browser/src/render/web_animations/web_animations_driver';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RemarksModalComponent } from '../modal/remarks-modal/remarks-modal.component';


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
  @Input() mode: string;
  @Input() text: string;
  @Input() sub_text: string;
  @Input() submit: Function;
  @Input() disabled: boolean;

  constructor(private _route: ActivatedRoute, private _router: Router, private _snackBar: MatSnackBar, private _dialog: MatDialog) {}

  ngOnInit() {
    this.showApprovalOptions = true;
    this.showRequestFlowOptions = false;
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
      if (this.mode.match(/approval/i)) {
        this.showApprovalOptions = true;
      }
      if (this.mode.match(/update/i) /*|| this.mode.match(/approval/)*/) {
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
        this.showRequestFlowOptions = false;
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

  return(): void {
    this._dialog.open(RemarksModalComponent, {
      width: '50%'
    });
  }
}
