import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Route } from '@angular/router';
import { AppBaseComponent } from '../app-base/app-base.component';
import { RemarksService } from '../remarks/remarks.service';
import { RemarksModalComponent } from '../modal/remarks-modal/remarks-modal.component';

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
  requestStatus: number;
  constructor(public route: ActivatedRoute, private _router: Router, private _dialog: MatDialog, private _snackBar: MatSnackBar, 
    public router: Router, private _remarksService: RemarksService) { 
    super(route, router);
  }

  ngOnInit() {
    this.getDatasource();  
  }

  showVisible(rId) {
    return this.lastId === rId;
  }

  AOreplytoChecker(): void {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
        newAffiliationId: this.requestId,
        actionCode: 'AO Replied To Checker',
        requestStatus: "9",
        rtype: "1",
      }
    });

    dialog.afterClosed().subscribe(d => {
      if(d === null)
      {
      this._router.navigateByUrl('/home/aoEncoder');
      }
      this.getDatasource();        
    });
  }

  UpdateAOreplytoChecker(id): void {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
        remarksId: id,
        newAffiliationId: this.requestId,
        requestStatus: "9",
        rtype: "1",
      }
    });

    dialog.afterClosed().subscribe(data => {
      this.getDatasource();
    });
  }

  private getDatasource() {
    this._remarksService.getRequestStatus(this.requestId).subscribe(data => {
      this.requestStatus = data;
      if (this.requestStatus === 9 || this.requestStatus === 2) //AO checker <--> AO encoder
      {
      this._remarksService.getByRequestId(this.requestId, 9).subscribe(data => {
        this.dataSource = data;
      });
      this._remarksService.getLastRemarks(this.requestId, 9).subscribe(data => {
        this.lastId = data;
      })

    }
    else
    {
      this.dataSource = null;
      this.lastId = 0;
    }

    })
  }

}
