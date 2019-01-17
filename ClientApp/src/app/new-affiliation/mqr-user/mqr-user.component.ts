import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { MatSnackBar, MatTabChangeEvent, matTabsAnimations, MatTab, MatTabGroup } from '../../../../node_modules/@angular/material';
import { MqrUserService } from './mqr-user.service';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { validateBasis } from '@angular/flex-layout';


@Component({
  selector: 'app-mqr-user',
  templateUrl: './mqr-user.component.html',
  styleUrls: ['./mqr-user.component.css'],
  providers: [MqrUserService]
})
export class MqrUserComponent implements OnInit {
  @ViewChild(MatTabGroup) matTab: MatTabGroup;
  title: string;
  subTitle: string;
  mode: string;
  showOif: boolean;
  displayMode: boolean;
  newAffiliationId: number;
  hasData: boolean;


  //@Input() displayMode: boolean = true;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _snackbar: MatSnackBar, private _service: MqrUserService, private _newAffiliationService: NewAffiliationRequestService, private _snackBar: MatSnackBar) {
    this.newAffiliationId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.title = 'Merchant Affiliation Review Officer';
    this.subTitle = 'Review Requests'
    this.mode = 'mqrUser';
    this.showOif = false;
    this.displayMode = true;
    this.hasData = false;
  }

  Submit() {
    this._router.navigateByUrl('/');
  }

  getNewAffiliationId(id) {
    this.newAffiliationId = id;
  }

  insertAWRMaefData() {
    this.hasData = true;
  }

  getTabIndex(val) { 
    this.matTab.selectedIndex = val;
  }
}
