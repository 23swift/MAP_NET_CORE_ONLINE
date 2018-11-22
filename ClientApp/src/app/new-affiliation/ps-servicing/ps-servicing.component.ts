import { Component, OnInit } from '@angular/core';
import { PsServicingService } from './ps-servicing.service';
import { MatStepper } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ps-servicing',
  templateUrl: './ps-servicing.component.html',
  styleUrls: ['./ps-servicing.component.css'],
  providers: [PsServicingService]
})
export class PsServicingComponent implements OnInit {
  title: string;
  subTitle: string;
  mode: string;
  midAction: boolean;
  constructor(private _router: Router) { }

  ngOnInit() {
    this.title = 'New Affiliation';
    this.subTitle = 'FOR POS PROCESSING';
    this.mode = 'forPsChecker';
    this.midAction = false;
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
