import { Component, OnInit } from '@angular/core';
import { MdcsCheckerService } from './mdcs-checker.service';

@Component({
  selector: 'app-mdcs-checker',
  templateUrl: './mdcs-checker.component.html',
  styleUrls: ['./mdcs-checker.component.css'],
  providers: [MdcsCheckerService]
})
export class MdcsCheckerComponent implements OnInit {
  title: string;
  subTitle: string;
  mode: string;
  options = {};
  constructor() { }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'FOR ENCODER CHECKER REVIEW';
    this.mode = 'forPreScreening';
  }

  Submit() {

  }
}
