import { RemarksService } from './../remarks/remarks.service';
import { Component, OnInit, Input } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { supportsWebAnimations } from '@angular/animations/browser/src/render/web_animations/web_animations_driver';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RemarksModalComponent } from '../modal/remarks-modal/remarks-modal.component';
import { NewAffiliationRequestService } from '../services/new-affiliation-request.service';
import { MaefFormService } from '../forms/maef-form/maef-form.service';
import { MdcsUserService } from '../new-affiliation/mdcs-user/mdcs-user.service';
import { PsServicingService } from '../new-affiliation/ps-servicing/ps-servicing.service';
import { CanActivateService } from '../services/can-activate.service';
import { AlertModalComponent } from '../modal/alert-modal/alert-modal.component';




@Component({
  selector: 'app-bdo-form-header',
  templateUrl: './bdo-form-header.component.html',
  styleUrls: ['./bdo-form-header.component.css'],
  providers: [MdcsUserService]
})
export class BdoFormHeaderComponent implements OnInit {
  showApprovalOptions: boolean;
  showRequestFlowOptions: boolean;
  showCreateOptions: boolean;
  showWelcomeLetter: boolean;
  showCadencieProcessingButton: boolean;
  showPosProcessingButton: boolean;
  showPsCheckerButton: boolean;
  showReturnRequestChecker:boolean;
  showReturnRequestMAMO:boolean;
  showReturnRequestApprover:boolean;
  showReturnRequestMQR:boolean;
  showMqrUserProcessingButton: boolean;
  showMdcsChecking: boolean;
  showPreScreen: boolean;
  showAOChecker: boolean;
  newAffiliationId: number;
  requestId: number;
  userCount: number;
  user: string;
  disableBtn: boolean = false;
  remarksData: Object[];
  lastAnyRemarksData: Object[];

  @Input() mode: string;
  @Input() text: string;
  @Input() sub_text: string;
  @Input() submit: Function;
  @Input() disabled: boolean;

  constructor(private _route: ActivatedRoute, private _router: Router, private _snackBar: MatSnackBar,
    private _dialog: MatDialog, private _newAffiliationService: NewAffiliationRequestService, private _maefFormService: MaefFormService,
    private _psService: PsServicingService, private _mdcsUserService: MdcsUserService, private _remarksService: RemarksService, public canActivateService: CanActivateService) {
    this._route.params.subscribe(param => {
      this.newAffiliationId = param['id'];
      this.requestId = param['id'];
    });

    this.canActivateService.claims$.subscribe(dd => {
      this.user = dd.name;
    }) 
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
    this.showReturnRequestChecker = false;
    this.showReturnRequestMAMO = false;
    this.showReturnRequestApprover = false;
    this.showReturnRequestMQR = false;
    this.showAOChecker = false;

    this.mode = this.mode ? this.mode : 'create';
    if (this._router.url.indexOf('/home')) {
      if (this.mode.match(/^approver$/i)) {
        this._maefFormService.getApproveUserCount(this.requestId).subscribe(data => {
          this.userCount = data;
          if (this.userCount != 0)
            {
              this.disableBtn = true;
            }
          
        });
        this.showApprovalOptions = true;
      }
      if (this.mode.match(/^aoChecker$/i) /*|| this.mode.match(/^approval/)*/) {
        this.showAOChecker = true;
      }
      if (this.mode.match(/^create$/i)) {
        this.showCreateOptions = true;
      }
      if (this.mode.match(/^mdmUser$/i)) {
        this.showWelcomeLetter = true;
      }
      if (this.mode.match(/^forCadencie$/i)) {
        this.showCadencieProcessingButton = true;
      }
      if (this.mode.match(/^forPos$/i)) {
        this.showPosProcessingButton = true;
      }
      if (this.mode.match(/^forPsChecker$/i)) {
        this.showPsCheckerButton = true;
      }
      if (this.mode.match(/^mqrUser$/i)) {
        this.showMqrUserProcessingButton = true;
      }
      if (this.mode.match(/^forMdcsChecking$/i)) {
        this.showMdcsChecking = true;
      }
      if (this.mode.match(/^forPreScreening/)) {
        this.showPreScreen = true;
      }
      if (this.mode.match(/^mauOfficer$/i)) {
        this.showRequestFlowOptions = true;
      }
      if (this.mode.match(/^mauEncoder$/i)) {
        this.showRequestFlowOptions = true;
      }
      if (this.mode.match(/^returnRequestChecker$/i)) {
        this.showReturnRequestChecker = true;
      }
      if (this.mode.match(/^returnRequestMAMO$/i)) {
        this.showReturnRequestMAMO = true;
      }
      if (this.mode.match(/^returnRequestApprover$/i)) {  
        this.showReturnRequestApprover = true;
      }
      if (this.mode.match(/^returnRequestMQR$/i)) {
        this.showReturnRequestMQR = true;
      }
      if (this.mode.match(/^mdcsUser$/i)) {
        this.showPosProcessingButton = true;
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

  reSubmitRequestChecker() {
    this._remarksService.checkUserRemarks(this.requestId, this.user).subscribe(data => {
      console.log(data);
      if(this.user == data.remarks)
      {
        this._maefFormService.ReSubmitRequestChecker(this.newAffiliationId).subscribe(data => {
          const snackBarRef = this._snackBar.open( 'Re-submit To Checker', 'Saved', {
            duration: 1000      
        });
      });
      }
      else
      {
        const snackBarRef = this._snackBar.open('Required', 'Remarks', {
          duration: 1000
        });
      } 
    }); 
  /*  {
      const snackBarRef = this._snackBar.open('Submitted To Approver', 'Saved', {
        duration: 1000
      });
      this._router.navigateByUrl('/home/mauEncoder');      
    });*/
  /*
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
      newAffiliationId : this.newAffiliationId,
      actionCode : 'Re-submit To Checker'
    }
    });

    dialog.afterClosed().subscribe(d => {
    });   */ 
  }

  reSubmitRequestMAMO() {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
      newAffiliationId : this.newAffiliationId,
      actionCode : 'Re-submit To MAMO'
    }
    });

    dialog.afterClosed().subscribe(d => {
    });   
  }

  reSubmitRequestApprover() {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
      newAffiliationId : this.newAffiliationId,
      actionCode : 'Re-submit To Approver'
    }
    });

    dialog.afterClosed().subscribe(d => {
    });   
  } 



  reSubmitRequestMQR() {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
      newAffiliationId : this.newAffiliationId,
      actionCode : 'Re-submit To MQR'
    }
    });

    dialog.afterClosed().subscribe(d => {
    });   
  }

  returnToAOByMAMO() {


    this._remarksService.GetAnyLastRemark(this.requestId, 27).subscribe(data => {
      this.lastAnyRemarksData = data; 
      if( this.lastAnyRemarksData == null ||this.user != this.lastAnyRemarksData['user'])
      {
        const dialog = this._dialog.open(AlertModalComponent, {
          width: '50%',
        }); 
      }
      else
      {
        this._maefFormService.ReturntoAOByMAMO(this.newAffiliationId).subscribe(data => {
          const snackBarRef = this._snackBar.open('Return To AO By MAMO', 'Saved', {
            duration: 1000
          });
          this._router.navigateByUrl('/home');      
        });    
      } 
    }); 
  }

  returnToAOByApprover() {

    this._remarksService.GetAnyLastRemark(this.requestId, 28).subscribe(data => {
      this.lastAnyRemarksData = data;
        if( this.lastAnyRemarksData == null || this.user != this.lastAnyRemarksData['user']) {
          this._remarksService.GetAnyLastRemark(this.requestId, 8).subscribe(data => {
            this.lastAnyRemarksData = data; 
            if(this.user != this.lastAnyRemarksData['user']) {
              const dialog = this._dialog.open(AlertModalComponent, {
                width: '50%',
              });   
            } else { 
              this._maefFormService.ReturntoAOByApprover(this.newAffiliationId).subscribe(data => {
                this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
                  this.remarksData = data;
                  this.remarksData['status'] = 28;
                  this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
                  });            
                }); 
      
                const snackBarRef = this._snackBar.open('Return To AO By Approver', 'Saved', {
                  duration: 1000
                });
                this._router.navigateByUrl('/home');      
              });
             }
          });           
        }
        else
        {
          this._maefFormService.ReturntoAOByApprover(this.newAffiliationId).subscribe(data => {
            this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
              this.remarksData = data;
              this.remarksData['status'] = 28;
              this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
              });            
            }); 
  
            const snackBarRef = this._snackBar.open('Return To AO By Approver', 'Saved', {
              duration: 1000
            });
            this._router.navigateByUrl('/home');      
          });        
        }

    });           

    /*
    this._remarksService.checkUserRemarks(this.requestId, this.user).subscribe(data => {
      console.log(data);
      if(this.user == data.remarks)
      {
        this._maefFormService.ReturntoAOByApprover(this.newAffiliationId).subscribe(data => {
          this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
            this.remarksData = data;
            this.remarksData['status'] = 28;
            this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
            });            
          }); 

          const snackBarRef = this._snackBar.open('Return To AO By Approver', 'Saved', {
            duration: 1000
          });
          this._router.navigateByUrl('/home');      
        });
      }
      else
      {
        const dialog = this._dialog.open(AlertModalComponent, {
          width: '50%',
        });      
      } 
    });    
    
    */

  }

  returntoAO() { //ao checker function
    /*
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
        newAffiliationId: this.newAffiliationId,
        actionCode: 'Return To AO By AO Checker',
        requestStatus: 26 //for saving of remarks
      }
    });

    dialog.afterClosed().subscribe(d => {
      if(d === null)
      {
      this._router.navigateByUrl('/home/aoChecker');
      }
    });       
    */

   this._remarksService.GetAnyLastRemark(this.requestId, 26).subscribe(data => {
    this.lastAnyRemarksData = data; 
    if( this.lastAnyRemarksData == null ||this.user != this.lastAnyRemarksData['user'])
    {
      const dialog = this._dialog.open(AlertModalComponent, {
        width: '50%',
      });  
    }
    else
    {
      this._maefFormService.ReturntoAO(this.newAffiliationId).subscribe(data => {
        const snackBarRef = this._snackBar.open('Return To AO By AO Checker', 'Saved', {
          duration: 1000
        });
        this._router.navigateByUrl('/home');      
      });          
    } 
  }); 

  }

  submittoApprover(): void {
    this._maefFormService.SubmitToApprover(this.newAffiliationId).subscribe(data => {
      const snackBarRef = this._snackBar.open('Submitted To Approver', 'Saved', {
        duration: 1000
      });
      this._router.navigateByUrl('/home/mauEncoder');      
    });

    
  }


  returntoMAMO(): void {

    this._remarksService.GetAnyLastRemark(this.requestId, 29).subscribe(data => {
      this.lastAnyRemarksData = data; 
        if(this.lastAnyRemarksData == null || this.user != this.lastAnyRemarksData['user']) {
          this._remarksService.GetAnyLastRemark(this.requestId, 8).subscribe(data => {
            this.lastAnyRemarksData = data; 
            if(this.user != this.lastAnyRemarksData['user']) {
              const dialog = this._dialog.open(AlertModalComponent, {
                width: '50%',
              });   
            } else { 
              this._maefFormService.ReturntoMAMO(this.newAffiliationId).subscribe(data => {
                this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
                  this.remarksData = data;
                  this.remarksData['status'] = 29;
                  this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
                  });            
                }); 
      
                const snackBarRef = this._snackBar.open('Return To MAMO By Approver', 'Saved', {
                  duration: 1000
                });
                this._router.navigateByUrl('/home');      
              });
             }
          });           
        }
        else
        {
          this._maefFormService.ReturntoMAMO(this.newAffiliationId).subscribe(data => {
            this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
              this.remarksData = data;
              this.remarksData['status'] = 29;
              this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
              });            
            }); 
  
            const snackBarRef = this._snackBar.open('Return To MAMO By Approver', 'Saved', {
              duration: 1000
            });
            this._router.navigateByUrl('/home');      
          });        
        }

    });  

/*
    this._remarksService.checkUserRemarks(this.requestId, this.user).subscribe(data => {
      console.log(data);
      if(this.user == data.remarks)
      {
        this._maefFormService.ReturntoMAMO(this.newAffiliationId).subscribe(data => {

          this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
            this.remarksData = data;
            this.remarksData['status'] = 29;
            this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
            });            
          });  
          const snackBarRef = this._snackBar.open('Return To MAMO By Approver', 'Saved', {
            duration: 1000
          });
          this._router.navigateByUrl('/home');      
        });
      }
      else
      {
        const dialog = this._dialog.open(AlertModalComponent, {
          width: '50%',
        });      
      } 
    });   */
  }

  decline(): void {

    this._remarksService.GetAnyLastRemark(this.requestId, 12).subscribe(data => {
      this.lastAnyRemarksData = data;
        if( this.lastAnyRemarksData == null || this.user != this.lastAnyRemarksData['user']) {
          this._remarksService.GetAnyLastRemark(this.requestId, 8).subscribe(data => {
            this.lastAnyRemarksData = data; 
            if( this.lastAnyRemarksData == null|| this.user != this.lastAnyRemarksData['user']) {
              const dialog = this._dialog.open(AlertModalComponent, {
                width: '50%',
              });   
            } else { 
              this._maefFormService.Decline(this.newAffiliationId).subscribe(data => {
                this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
                  this.remarksData = data;
                  this.remarksData['status'] = 12;
                  this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
                  });            
                }); 
      
                const snackBarRef = this._snackBar.open('Decline', 'Saved', {
                  duration: 1000
                });
                this._router.navigateByUrl('/home');      
              });
             }
          });           
        }
        else
        {
          this._maefFormService.Decline(this.newAffiliationId).subscribe(data => {
            this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
              this.remarksData = data;
              this.remarksData['status'] = 12;
              this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
              });            
            }); 
  
            const snackBarRef = this._snackBar.open('Decline', 'Saved', {
              duration: 1000
            });
            this._router.navigateByUrl('/home');      
          });        
        }

    });  

    
/*
    this._remarksService.checkUserRemarks(this.requestId, this.user).subscribe(data => {
      console.log(data);
      if(this.user == data.remarks)
      {
        this._maefFormService.Decline(this.newAffiliationId).subscribe(data => {

          this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
            this.remarksData = data;
            this.remarksData['status'] = 12;
            this._remarksService.update(this.remarksData['id'], this.remarksData).subscribe(data => {      
            });            
          }); 

          const snackBarRef = this._snackBar.open('Decline', 'Saved', {
            duration: 1000
          });
          this._router.navigateByUrl('/home');      
        });
      }
      else
      {
        const dialog = this._dialog.open(AlertModalComponent, {
          width: '50%',
        });      
      } 
    });   */  

  }

  approve(): void {
    this._maefFormService.Approve(this.newAffiliationId).subscribe(data => {
      const snackBarRef = this._snackBar.open('Approved', 'Saved', {
        duration: 1000
      });
      this._router.navigateByUrl('/home/approver');
    });
  }

  submitForPOSProcessing(): void {
    this._mdcsUserService.validateMID(this.newAffiliationId).subscribe(isValid => {
      if (isValid) {
        this._newAffiliationService.updateRequestForMdcsUser(this.newAffiliationId).subscribe(x => {
          const snackBarSub = this._snackBar.open('New Affiliation Request', 'Submitted For POS Processing', {
            duration: 2000
          });

          snackBarSub.afterDismissed().subscribe(() => {
            this._router.navigateByUrl('/home/mdcsUser');
          });
        }, err => {
          if (err['status'] === 400) {
            const snackBarSub = this._snackBar.open('One or More Branches Were Not Updated', 'Failed', {
              duration: 2000
            });
          }
        });
      }
      else { 
        const snackBarSub = this._snackBar.open('One or More Branches does not have MID / DebitTID Supplied!', 'Failed', {
          duration: 2000
        });
      }
    });
  }

  complete() {
    const snackBarSub = this._snackBar.open('New Affiliation Request!', 'Completed', {
      duration: 2000
    });

    snackBarSub.afterDismissed().subscribe(() => {
      this._router.navigateByUrl('/home/mdm');
    });
  }

}
