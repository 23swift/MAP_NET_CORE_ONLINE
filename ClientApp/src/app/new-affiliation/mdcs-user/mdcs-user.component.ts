import { Component, OnInit } from '@angular/core';
import { MdcsUserService } from './mdcs-user.service';

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
  constructor() { }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'APPROVED';
    this.mode = 'forCadencie';
    this.showOif = false;
    this.displayMode = true;
  }

  Submit() {
    
  }

  getNewAffiliationId(id) {
    this.newAffiliationId = id;
  }
  
}
