import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-verification-screen',
  templateUrl: './verification-screen.component.html',
  styleUrls: ['./verification-screen.component.css']
})
export class VerificationScreenComponent implements OnInit {
  @Input() mode: string;
  reqId: number;
  displayMode: boolean;
  userGroup: string;
  constructor( public route: ActivatedRoute,
    public router: Router ) { 
    this.reqId = +this.route.snapshot.paramMap.get('id'); 
  }

  ngOnInit() {
    if(this.mode == 'mauEncoder')
     {
       this.displayMode = false;
     }
     else if(this.mode == 'approver')
     {
       this.displayMode = true;
     } 

  }

}
