import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
  providers:[]
})
export class RequestComponent implements OnInit {
  @Input() displayMode: boolean;
  title: string = 'Request New Affiliation';
  rstatus: string;
  subTitle: string;
  reqId: number;
  mode: string;
  model: any;
  showHeader: boolean;

  constructor(public route: ActivatedRoute,
    public router: Router, private _requestService: RequestService) { 
      // super(route, router);
      this.reqId = +this.route.snapshot.params['id'];
    }

  ngOnInit() {
    this.showHeader = false;
    this._requestService.getStatus(this.reqId).subscribe(data => {
      this.model = data;
      if (this.model === 22) {
        this.subTitle = 'Returned By Checker';
        this.mode = "returnRequestChecker";
    }      
      else if (this.model === 23) {
        this.subTitle = 'Returned By MAMO';
        this.mode = "returnRequestMAMO";
    }
      else if (this.model === 24) {
        this.subTitle = 'Returned By Approver';
        this.mode = "returnRequestApprover";
    }
      else if (this.model === 25) {
        this.subTitle = 'Returned By MQR';
        this.mode = "returnRequestMQR";
   }
      else {
        this.mode = "";
      }

      this.showHeader = true;
    });

   
  }
  Submit() {
    
  }
}
