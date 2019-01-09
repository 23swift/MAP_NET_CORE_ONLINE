import { Component, OnInit } from '@angular/core';
import { MdcsUserService } from './mdcs-user.service';
import { RequestService } from 'src/app/services/request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NewAffiliationRequestService } from 'src/app/services/new-affiliation-request.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mdcs-user',
  templateUrl: './mdcs-user.component.html',
  styleUrls: ['./mdcs-user.component.css'],
  providers: [MdcsUserService]
})
export class MdcsUserComponent implements OnInit {
  title: string;
  subTitle: string;
  mode: string;
  showOif: boolean;
  displayMode: boolean;
  newAffiliationId: number;

  constructor( private _route: ActivatedRoute) {
    this.newAffiliationId = +this._route.snapshot.params['id'];
  }


  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = '';
    this.mode = 'mdcsUser';
    this.showOif = false;
    this.displayMode = true;
  }


  getNewAffiliationId(id) {
    this.newAffiliationId = id;
  }

  submit() {
   

  }

}
