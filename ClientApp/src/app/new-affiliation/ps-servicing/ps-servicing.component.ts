import { Component, OnInit, Input } from '@angular/core';
import { PsServicingService } from './ps-servicing.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { Observable } from 'rxjs';
import { BranchListService } from 'src/app/branch-list/branch-list.service';

@Component({
  selector: 'app-ps-servicing',
  templateUrl: './ps-servicing.component.html',
  styleUrls: ['./ps-servicing.component.css'],
  providers: [PsServicingService, BranchListService]
})

export class PsServicingComponent implements OnInit {
  @Input() userGroup: string;
  title: string;
  subTitle: string;
  mode: string;
  midAction: boolean;
  requestId: number;
  branchId: number;
  branchList: Observable<any>;

  constructor(public _router: Router,
    public _route: ActivatedRoute,
    private _psService: PsServicingService,
    private _newAffiliationService: NewAffiliationRequestService,
    private _snackBar: MatSnackBar,
    private _branchListService: BranchListService) {
      this.requestId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'FOR POS PROCESSING';
    this.mode = 'forPsChecker';
    this.branchList = this._branchListService.getByNewAffiliationId(this.requestId);
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
