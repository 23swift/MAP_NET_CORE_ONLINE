import { Component, OnInit, Input } from '@angular/core';
import { PsServicingService } from './ps-servicing.service';
import { MatStepper, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AppBaseComponent } from 'src/app/app-base/app-base.component';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';

@Component({
  selector: 'app-ps-servicing',
  templateUrl: './ps-servicing.component.html',
  styleUrls: ['./ps-servicing.component.css'],
  providers: [PsServicingService]
})

export class PsServicingComponent implements OnInit {
  @Input() userGroup: string;
  title: string;
  subTitle: string;
  mode: string;
  midAction: boolean;
  requestId: number;
  branchId: number;

  constructor(public _router: Router,
    public _route: ActivatedRoute,
    private _psService: PsServicingService,
    private _newAffiliationService: NewAffiliationRequestService,
    private _snackBar: MatSnackBar) {
      this.requestId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'FOR POS PROCESSING';
    this.mode = 'forPsChecker';
  }

  public completed(stepper: MatStepper) {
    this._psService.validateForPsServicing(this.requestId).subscribe(v => {
      if (v) {
        stepper.selected.completed = true;
        stepper.next();
      } else {
        const snackBarSub = this._snackBar.open('One or more POS Request were not updated!', 'Failed', {
          duration: 2000
        });
      }
    });
  }

  Submit() {
    this._psService.validateForPsServicing(this.requestId).subscribe(v => {
      if (v) {
        this._newAffiliationService.updateRequestForPsServicing(this.requestId).subscribe(r => {
          const snackBarSub = this._snackBar.open('POS Request!', 'Submitted', {
            duration: 2000
          });
    
          snackBarSub.afterDismissed().subscribe(() => {
            this._router.navigateByUrl('/home/pss');
          });
        });
      } else {
        const snackBarSub = this._snackBar.open('One or more POS Request were not updated!', 'Failed', {
          duration: 2000
        });
      }
    });
  }
}
