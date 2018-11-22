import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ao-checking',
  templateUrl: './ao-checking.component.html',
  styleUrls: ['./ao-checking.component.css']
})
export class AoCheckingComponent implements OnInit {
  title: string = 'New Affiliation';
  subTitle: string = 'Account Officer Checking';
  mode: string;
  constructor() { }

  ngOnInit() {
  }

}
