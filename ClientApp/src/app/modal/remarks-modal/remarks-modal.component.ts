import { RemarksService } from './../../remarks/remarks.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { RemarksModalService } from './remarks-modal.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MaefFormService } from '../../forms/maef-form/maef-form.service';
import { CanActivateService } from '../../services/can-activate.service';



export interface RemModal {
  remarks: string;
}

@Component({
  selector: 'app-remarks-modal',
  templateUrl: './remarks-modal.component.html',
  styleUrls: ['./remarks-modal.component.css'],
  providers: [RemarksModalService, MaefFormService, RemarksService]
})

export class RemarksModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  user: string;
  groupCode: string;
  action: string;
  remarks: string;
  date: string;
  ifWithRemarks: Object;
  disable: boolean;
  showSubmit: boolean = true;
  showEdit: boolean = false;
  status: number;
  buttonName: string;

  constructor(private _modalRef: MatDialogRef<RemarksModalComponent>, private _remarksModalService: RemarksModalService, private _maefFormService: MaefFormService, private _remarksService: RemarksService, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar, 
    public canActivateService: CanActivateService) {
    this.form = new FormGroup({
      remarks: new FormControl('')
    });
    this.date = new Date().toLocaleDateString();
    //this.canActivateService.claims$.toPromise().then(s => {
    //this.user = s.name; 
    //})

    this.canActivateService.claims$.subscribe(dd => {
      this.user = dd.name;
    })



    if(!this.data['rtype'])
    {
    this._maefFormService.checkRemarks(this.data['newAffiliationId'], this.data['actionCode']).subscribe(data => {
      this.ifWithRemarks= data;
          if (this.ifWithRemarks == true)
          {
            this._maefFormService.getRemarks(this.data['newAffiliationId'], this.data['actionCode']).subscribe(data => {
            this.model= data;
            this.form.controls['remarks'].setValue(this.model['remarks']);
             }); 
             this.form.get('remarks').disable();
             this.showSubmit = false;
             this.showEdit = true;
          }
    });
    }
    else 
    {
       if(this.data['remarksId'])
         {
          this._remarksService.getRemark(this.data['remarksId']).subscribe(data => {
            this.form.controls['remarks'].setValue(data.remarks);
          })
         }
      else
         {
           console.log("add");
         }
    }
           
  }

  ngOnInit() { 
    this.status = this.data['requestStatus'];  
    this.model = { remarks: '', requestId: this.data['newAffiliationId'], user: '', groupCode: '', action: '', date: '' };
    if (this.data.actionCode == "Return To AO By MAMO" || this.data.actionCode == "Return To AO By Approver" || this.data.actionCode == "Return To AO By AO Checker")
      {
      //  this.buttonName = 'Return To AO';
      }
    else if (this.data.actionCode == "Decline") 
      {
        this.buttonName = 'Decline';
      }  
    else if (this.data.actionCode == "Return To MAMO")
      {
        this.buttonName = 'Return To MAMO'
      } 
     else
     {

     }
     
  // console.log(this.data.actionCode + 'ffde');
   // if (this.form.value['remarks'] == '') {
   //   this.form.get('remarks').disable();
   // }
  }

  save() {
    this.model['remarks'] = this.form.value['remarks'];
    this.model['user'] = this.user; //
    this.model['groupCode'] = 'mauEncoder';
    this.model['action'] =this.data['actionCode'] + ':Save Remarks';
    this.model['actionCode'] =this.data['actionCode'];
    this.model['date'] =  this.date;
    this.model['id'] = undefined;
    this.model['status'] = this.status;
    this._remarksModalService.create(this.model).subscribe(data => {
      const snackBarRef = this._snackBar.open( this.data['actionCode'] + ' Details', 'Saved', {
        duration: 1000
      });
      this.showSubmit = false;
      this.showEdit = true;
      this.form.get('remarks').disable();   
    //
    if(this.data['remarksId'] == undefined) 
    {
    this._remarksService.create(this.model).subscribe(data => {
    })
    }
    else
    {
     this.model['id'] = this.data['remarksId']; 
     console.log(this.model); 
     this._remarksService.update(this.data['remarksId'],this.model).subscribe(data => {      
     })  
    }
    //   
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });

  }

  update() {
    if (this.data['actionCode'] == 'Return To AO By AO Checker')
    {
    this._maefFormService.ReturntoAO(this.data['newAffiliationId']).subscribe(data => {
      const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
        duration: 1000      
    });
    snackBarRef.afterDismissed().subscribe(s => {
      this._modalRef.close(data);
    });
  }); 
    }
    else if(this.data['actionCode'] == 'Return To AO By MAMO')
    {
      this._maefFormService.ReturntoAOByMAMO(this.data['newAffiliationId']).subscribe(data => {
        const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
          duration: 1000      
      });
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
    }
    else if(this.data['actionCode'] == 'Return To AO By Approver')
    {
      this._maefFormService.ReturntoAOByApprover(this.data['newAffiliationId']).subscribe(data => {
        const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
          duration: 1000      
      });
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
    }     
    else if(this.data['actionCode'] == 'Return To MAMO')
    {
      this._maefFormService.ReturntoMAMO(this.data['newAffiliationId']).subscribe(data => {
        const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
          duration: 1000      
      });
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
    }
    else if(this.data['actionCode'] == 'Decline')
    {
      this._maefFormService.Decline(this.data['newAffiliationId']).subscribe(data => {
        const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
          duration: 1000      
      });
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
    }
    else if(this.data['actionCode'] == 'Re-submit To Checker')
    {
      this._maefFormService.ReSubmitRequestChecker(this.data['newAffiliationId']).subscribe(data => {
        const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
          duration: 1000      
      });
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
    }
    else if(this.data['actionCode'] == 'Re-submit To MAMO')
    {
      this._maefFormService.ReSubmitRequestMAMO(this.data['newAffiliationId']).subscribe(data => {
        const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
          duration: 1000      
      });
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
    }
    else if(this.data['actionCode'] == 'Re-submit To Approver')
    {
      this._maefFormService.ReSubmitRequestApprover(this.data['newAffiliationId']).subscribe(data => {
        const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
          duration: 1000      
      });
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
    }
    else if(this.data['actionCode'] == 'Re-submit To MQR')
    {
      this._maefFormService.ReSubmitRequestMQR(this.data['newAffiliationId']).subscribe(data => {
        const snackBarRef = this._snackBar.open( this.data['actionCode'], 'Saved', {
          duration: 1000      
      });
      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
    }            

  }


  editRemarks() {
    this.form.get('remarks').enable();
  }

  cancel() {
    this._modalRef.close();
  }






  /*
  submit() {
    this._modalRef.close(this.form.value);
  }
  save() {
  }
  getItem() {

  } */
}
