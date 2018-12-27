import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-verification-screen',
  templateUrl: './verification-screen.component.html',
  styleUrls: ['./verification-screen.component.css']
})
export class VerificationScreenComponent implements OnInit {
  reqId: number;
  displayMode: boolean;
  userGroup: string;
  constructor( public route: ActivatedRoute,
    public router: Router ) { 
    this.reqId = +this.route.snapshot.paramMap.get('id'); 
  }

  ngOnInit() {
     this.userGroup = 'approver';
     if(this.userGroup == 'mauEncoder')
     {
       this.displayMode = false;
     }
     else if(this.userGroup == 'approver')
     {
       this.displayMode = true;
     } 

  }

}
