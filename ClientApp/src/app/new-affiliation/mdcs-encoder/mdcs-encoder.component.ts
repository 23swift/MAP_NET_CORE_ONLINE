import { Component, OnInit } from '@angular/core';
import { MdcsEncoderService } from './mdcs-encoder.service';

@Component({
  selector: 'app-mdcs-encoder',
  templateUrl: './mdcs-encoder.component.html',
  styleUrls: ['./mdcs-encoder.component.css'],
  providers: [MdcsEncoderService]
})
export class MdcsEncoderComponent implements OnInit {
  title: string;
  subTitle: string;
  mode: string;
  newAffiliationId: number;
  constructor() { }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'FOR ENCODING';
    this.mode = 'forMdcsChecking';
  }

  getNewAffiliationId(id) {
    this.newAffiliationId = id;
  }

  submit() {

  }
}
