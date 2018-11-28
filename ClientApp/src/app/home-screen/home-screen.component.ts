import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {
  mode = '';
  status = 'done';
  userGroup: string;
  constructor(private _router: ActivatedRoute) {
    this._router.params.subscribe(param => {
      this.userGroup = param['userGroup'];
    });
  }

  ngOnInit() {
  }

}
