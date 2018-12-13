import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-verification-screen',
  templateUrl: './verification-screen.component.html',
  styleUrls: ['./verification-screen.component.css']
})
export class VerificationScreenComponent implements OnInit {
  reqId: number;

  constructor( public route: ActivatedRoute,
    public router: Router ) { 
    this.reqId = +this.route.snapshot.paramMap.get('id'); 
  }

  ngOnInit() {
  }

}
