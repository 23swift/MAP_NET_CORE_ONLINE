import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';

@Component({
  selector: 'app-mau-officer',
  templateUrl: './mau-officer.component.html',
  styleUrls: ['./mau-officer.component.css']
})
export class MauOfficerComponent extends AppBaseComponent implements OnInit {
  title: string = 'Merchant Affiliation & Maintenance Pre-screening and Evaluation';
  @Input() displayMode: boolean = false;
  mode: string;
  subTitle: string = '';
  constructor(public route: ActivatedRoute,
    public router: Router) {
    super(route, router);
  }

  ngOnInit() {
    this.mode = this.route.snapshot.params.mode;
  }
  Submit() {
    
  }
}
