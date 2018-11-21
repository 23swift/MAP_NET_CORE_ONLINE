import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  model = {
    errField: ''
  };
  constructor() { }

  ngOnInit() {
  }

}
