import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Route } from '@angular/router';
import { AppBaseComponent } from '../app-base/app-base.component';
import { RemarksService } from '../remarks/remarks.service';
import { RemarksModalComponent } from '../modal/remarks-modal/remarks-modal.component';
import { CanActivateService } from '../services/can-activate.service';

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
  user: string;
  showButton: boolean;
  showComponent: boolean = true;
  actionCode: string;
  constructor(public route: ActivatedRoute, private _router: Router, private _dialog: MatDialog, private _snackBar: MatSnackBar, 
    public router: Router, private _remarksService: RemarksService, public canActivateService: CanActivateService) { 
    super(route, router);
    this.canActivateService.claims$.subscribe(dd => {
      this.user = dd.name;
    })
  }

  ngOnInit() {

    this.getDatasource();  
    this.AddorEdit();
  }


  AOreplytoChecker(): void {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
        newAffiliationId: this.requestId,
        actionCode: 'AO Replied To Checker',
        requestStatus: "26",
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

  AddReply(): void {
    this._remarksService.getRequestStatus(this.requestId).subscribe(data => {
      this.requestStatus = data;
      if (this.requestStatus === 26 || this.requestStatus === 2) {
          this.actionCode = 'AO Replied TO Checker';
          this.requestStatus = 26;
      }
      else if (this.requestStatus === 27 || this.requestStatus === 7) {
          this.actionCode = 'mau';
          this.requestStatus = 27;
      }

      const dialog = this._dialog.open(RemarksModalComponent, {
        width: '50%',
        data: {
          newAffiliationId: this.requestId,
          actionCode: this.actionCode,
          requestStatus: this.requestStatus,
          rtype: "1",
        }
      });
  
      dialog.afterClosed().subscribe(d => {
        this.getDatasource();        
      });


    })
  }

  UpdateReply(id): void {
    this._remarksService.getRequestStatus(this.requestId).subscribe(data => {
      this.requestStatus = data;
      if (this.requestStatus === 26 || this.requestStatus === 2) {
          this.requestStatus = 26;
      }
      else if (this.requestStatus === 27 || this.requestStatus === 7) {
          this.requestStatus = 27;
      }

      const dialog = this._dialog.open(RemarksModalComponent, {
        width: '50%',
        data: {
          remarksId: id,
          newAffiliationId: this.requestId,
          requestStatus: this.requestStatus,
          rtype: "1",
        }
      });
  
      dialog.afterClosed().subscribe(d => {
        this.getDatasource();        
      });


    })    
  }

  UpdateAOreplytoChecker(id): void {
    const dialog = this._dialog.open(RemarksModalComponent, {
      width: '50%',
      data: {
        remarksId: id,
        newAffiliationId: this.requestId,
        requestStatus: "26",
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
      if (this.requestStatus === 26 || this.requestStatus === 2) //AO checker <--> AO encoder
      {
      this._remarksService.getByRequestId(this.requestId, 26).subscribe(data => {
        this.dataSource = data;
      });
      this._remarksService.getLastRemarks(this.requestId, 26).subscribe(data => {
        this.lastId = data;
      })
      }
      else if (this.requestStatus === 27 || this.requestStatus === 7)
      {
        this._remarksService.getByRequestId(this.requestId, 27).subscribe(data => {
          this.dataSource = data;
        });
        this._remarksService.getLastRemarks(this.requestId, 27).subscribe(data => {
          this.lastId = data;
        })
      }
    else
    {
      this.dataSource = null;
      this.lastId = 0;
      console.log('no datasource');
    }

    })
  }

  private AddorEdit() {
    this._remarksService.checkUserRemarks(this.requestId, this.user).subscribe(data => {
      console.log(data);
      if(this.user == data.remarks)
      {
            this.showButton = true
      }
      else
      {
            this.showButton = false
      } 
    }); 
  }

  private HideComponent(){
    this.showComponent = false;
  }

  private ViewComponent(){
    this.showComponent = true;
  }

}
