import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent extends AppBaseComponent implements OnInit {
  @Input() displayMode: boolean = true;
  title: string = 'Request New Affiliation';

  constructor(public route: ActivatedRoute,
    public router: Router) { 
      super(route, router);
    }

  ngOnInit() {
  }
  Submit() {
    
  }
}
