import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';

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
    constructor(public route: ActivatedRoute,
        public router: Router) {
        super(route, router);
    }

    ngOnInit() {
        //this.mode = this.route.snapshot.params.mode;
        //  this.mode = "approver"; //user type 8  
        this.mode = "mauEncoder";  // 7

        if (this.mode === "approver") {
            this.title = 'Merchant Affiliation & Maintenance Approval';
            this.displayMode = true;
        }
        else if (this.mode === "mauEncoder") {
            this.title = 'Merchant Affiliation & Maintenance Pre-screening and Evaluation';
            this.displayMode = false;
        }
    }
    Submit() {

    }
}
