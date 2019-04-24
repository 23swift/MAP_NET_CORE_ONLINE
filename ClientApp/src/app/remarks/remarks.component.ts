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
  lastUserRemarks: Object[];
  requestStatus: number;
  user: string;
  showButton: boolean;
  showComponent: boolean = true;
  actionCode: string;
  status2: number;
  constructor(public route: ActivatedRoute, private _router: Router, private _dialog: MatDialog, private _snackBar: MatSnackBar, 
    public router: Router, private _remarksService: RemarksService, public canActivateService: CanActivateService) { 
    super(route, router);
    this.canActivateService.claims$.subscribe(dd => {
      this.user = dd.name;
    })
  }

  ngOnInit() {

    this.getDatasource(); 
    
    this._remarksService.getRequestStatus(this.requestId).subscribe(data => {
      this.requestStatus = data;
    })


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
      else if (this.requestStatus === 28 || this.requestStatus === 30) {
        this.actionCode = 'approver';
        this.requestStatus = 28;
      }
    else if (this.requestStatus === 29 || this.requestStatus === 31) {
      this.actionCode = 'approver';
      this.requestStatus = 29;
      }
      else if (this.requestStatus === 8) {
          this.actionCode = 'approver'
          this.requestStatus = 8;
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
      else if (this.requestStatus === 28 || this.requestStatus === 30) {
        this.requestStatus = 28;
      }
    else if (this.requestStatus === 29 || this.requestStatus === 31) {
      this.requestStatus = 29;
      }
      else if (this.requestStatus === 8) {
          this.requestStatus = 8;
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
          this.lastUserRemarks = data;
          if(this.lastUserRemarks != null){
          this.lastId = this.lastUserRemarks['id'];
          this.AddorEdit(this.lastUserRemarks['user']);
          }
        }) 
      }
      else if (this.requestStatus === 27 || this.requestStatus === 7)
      {
        this._remarksService.getByRequestId(this.requestId, 27).subscribe(data => {
          this.dataSource = data;
        });
        this._remarksService.getLastRemarks(this.requestId, 27).subscribe(data => {
          this.lastUserRemarks = data;
          if(this.lastUserRemarks != null){
          this.lastId = this.lastUserRemarks['id'];
          this.AddorEdit(this.lastUserRemarks['user']);
          }
        }) 
      }
      else if (this.requestStatus === 28 || this.requestStatus === 30 )
      {
        this._remarksService.getByRequestId(this.requestId, 28).subscribe(data => {
          this.dataSource = data;
        });
        this._remarksService.getLastRemarks(this.requestId, 28).subscribe(data => {
          this.lastUserRemarks = data;
          if(this.lastUserRemarks != null){
          this.lastId = this.lastUserRemarks['id'];
          this.AddorEdit(this.lastUserRemarks['user']);
          }
        })        
      }
      else if (this.requestStatus === 29 || this.requestStatus === 31 )
      {
        this._remarksService.getByRequestId(this.requestId, 29).subscribe(data => {
          this.dataSource = data;
        });
        this._remarksService.getLastRemarks(this.requestId, 29).subscribe(data => {
          this.lastUserRemarks = data;
          if(this.lastUserRemarks != null){
          this.lastId = this.lastUserRemarks['id'];
          this.AddorEdit(this.lastUserRemarks['user']);
          }
        })         
      }
      else if (this.requestStatus === 8)
      {
        this._remarksService.getByRequestId(this.requestId, 8).subscribe(data => {
          this.dataSource = data;
        });
        this._remarksService.getLastRemarks(this.requestId, 8).subscribe(data => {
          this.lastUserRemarks = data;
          if(this.lastUserRemarks != null){
          this.lastId = this.lastUserRemarks['id'];
          this.AddorEdit(this.lastUserRemarks['user']);
          }
        })        
      }  
      else if (this.requestStatus === 12)
      {
        this._remarksService.getByRequestId(this.requestId, 12).subscribe(data => {
          this.dataSource = data;
        });
        this._remarksService.getLastRemarks(this.requestId, 12).subscribe(data => {
          this.lastUserRemarks = data;
          if(this.lastUserRemarks != null){          
          this.lastId = this.lastUserRemarks['id'];
          this.AddorEdit(this.lastUserRemarks['user']);
          }
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

  private AddorEdit(user) {
      if(this.user == user)
      {
            this.showButton = true
      }
      else
      {
            this.showButton = false
      } 
  }

  private HideComponent(){
    this.showComponent = false;
  }

  private ViewComponent(){
    this.showComponent = true;
  }

}
