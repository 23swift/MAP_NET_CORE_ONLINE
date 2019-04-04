import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';
import { RemarksService } from '../../remarks/remarks.service';

@Component({
    selector: 'app-mau-officer',
    templateUrl: './mau-officer.component.html',
    styleUrls: ['./mau-officer.component.css']
})
export class MauOfficerComponent extends AppBaseComponent implements OnInit {
    title: string;
    @Input() displayMode: boolean;
    mode: string;
    subTitle: string = '';
    reqId: number;
    reqStatus: string;
    claims: BehaviorSubject<Object>;
    constructor(public route: ActivatedRoute,
        public router: Router, private _remarksService: RemarksService) {
        super(route, router);
        this.reqId = +this.route.snapshot.params['id'];  
    }

    ngOnInit() {
        this._remarksService.getRequestStatus(this.reqId).subscribe(data => {
            this.reqStatus = data;
            if (this.reqStatus == "8" || this.reqStatus == "30" || this.reqStatus == "31" ) {   //approver
                this.title = 'Merchant Affiliation & Maintenance Approval';
                this.displayMode = true;
                this.mode = "approver"
            }
            else if (this.reqStatus == "7") {   //mauEncoder
                this.title = 'Merchant Affiliation & Maintenance Pre-screening and Evaluation';
                this.displayMode = false;
                this.mode = "mauEncoder"
            }
        });

 

    }
    Submit() {

    }
}
