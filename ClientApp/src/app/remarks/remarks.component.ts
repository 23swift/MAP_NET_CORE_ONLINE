import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../app-base/app-base.component';
import { RemarksService } from '../remarks/remarks.service';

@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.css'],
  providers: [RemarksService]
})
export class RemarksComponent extends AppBaseComponent implements OnInit {
  @Input() requestId: number;
  dataSource: Object[];
  lastId: number;

  constructor(public route: ActivatedRoute,
    public router: Router, private _remarksService: RemarksService) { 
    super(route, router);
  }

  ngOnInit() {
    this._remarksService.getByRequestId(this.requestId).subscribe(data => {
      this.dataSource = data;
    });

    this._remarksService.getLastRemarks(this.requestId).subscribe(data => {
      this.lastId = data;
    })
  }

  showVisible(rId) {
    return this.lastId === rId;
  }

}
