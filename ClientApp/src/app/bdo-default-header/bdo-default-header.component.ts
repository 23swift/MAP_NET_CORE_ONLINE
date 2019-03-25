import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, DoCheck, AfterContentChecked } from '@angular/core';
import { interval, BehaviorSubject } from 'rxjs';
import { formatDate } from '@angular/common';
import { BdoDefaultHeaderService } from './bdo-default-header.service';
import { CanActivateService, Claims } from '../services/can-activate.service';

@Component({
  selector: 'app-bdo-default-header',
  templateUrl: './bdo-default-header.component.html',
  styleUrls: ['./bdo-default-header.component.css']
})
export class BdoDefaultHeaderComponent implements OnInit {
  @Input() screenName: string;
  systemDate: string;
  systemTime: string;
  claims$: BehaviorSubject<Claims>;

  constructor(private service: BdoDefaultHeaderService, private canActivateService: CanActivateService) {
  }

  ngOnInit() {
    this.claims$ = this.canActivateService.claims$;
    this.systemDate = formatDate(new Date(), 'MMMM dd, yyyy', 'en-US');
    this.systemTime = formatDate(new Date(), 'hh:mm:ss a', 'en-US');
    this.getTime();
    console.log(this.claims$);
  }
  
  getTime() {
    const time = interval(1000);
    time.subscribe(x => {
      this.systemTime = formatDate(new Date(), 'hh:mm:ss a', 'en-US');
    });
  }

  logout() {
    this.service.logout().subscribe(v => {
      console.log('LOGOUT!');
    });
  }
}
