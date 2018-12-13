import { Component, OnInit, Input } from '@angular/core';
import { PsServicingService } from './ps-servicing.service';
import { MatStepper } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { AppBaseComponent } from 'src/app/app-base/app-base.component';

@Component({
  selector: 'app-ps-servicing',
  templateUrl: './ps-servicing.component.html',
  styleUrls: ['./ps-servicing.component.css'],
  providers: [PsServicingService]
})

export class PsServicingComponent extends AppBaseComponent implements OnInit {
  @Input() userGroup: string;
  title: string;
  subTitle: string;
  mode: string;
  midAction: boolean;

  constructor(public _router: Router,
    public _route: ActivatedRoute) {
    super(_route, _router);
  }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'FOR POS PROCESSING';
    this.mode = 'forPsChecker';
    this.midAction = false;
    console.log(this.userGroup);
  }

  completed(stepper: MatStepper) {
    this.clearUrl();
    stepper.selected.completed = true;
    stepper.next();
    return true;
  }

  clearUrl() {
    const parentRoute = this._router.url.split('/(')[0];
    if (parentRoute) {
      this._router.navigateByUrl(`${parentRoute}`);
    }
  }

  Submit() {

  }
}
