import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-admrc-section-type',
  templateUrl: './print-admrc-section-type.component.html',
  styleUrls: ['./print-admrc-section-type.component.css']
})
export class PrintAdmrcSectionTypeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  print() {
    window.print();
  }

}
