import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.css']
})
export class ApproverComponent extends AppBaseComponent implements OnInit {
  @Input() displayMode: boolean = true;
  title: string = 'Request Approval';
  mode: string;
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
