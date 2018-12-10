import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ApproveWithExceptReasonDetailsModalService } from './approve-with-except-reason-details-modal.service';

@Component({
  selector: 'app-approve-with-except-reason-details-modal',
  templateUrl: './approve-with-except-reason-details-modal.component.html',
  styleUrls: ['./approve-with-except-reason-details-modal.component.css'],
  providers: [ApproveWithExceptReasonDetailsModalService]
})
export class ApproveWithExceptReasonDetailsModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options : FormlyFormOptions = {
  };
  
  constructor(private _modalRef: MatDialogRef<ApproveWithExceptReasonDetailsModalComponent>, private _service: ApproveWithExceptReasonDetailsModalService, @Inject(MAT_DIALOG_DATA) 
  public data: any, private _snackBar: MatSnackBar) { 
    if(this.data.appex) {
      this.model = this.data.appex;
     }
     else{
      this.model = { MAEFId: this.data['maefId']  };
    }
        // this._service.getByAppReq(this.data.appreq['id']).subscribe(data => {
        // this.model = data;    
        // }); 
  
      this.getFields();
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
     //console.log(this.data['maefId'] + 'xxc');
     if(this.model['id']){
      console.log(this.model);
     this._service.update(this.model['id'], this.model).subscribe(data => {
       const snackBarRef = this._snackBar.open('Approve With Exception Reason Details', 'Updated', {
         duration: 1000
       });
       snackBarRef.afterDismissed().subscribe(s => {
         this._modalRef.close(data);
       });
     });
    }
    else {
   this._service.create(this.model).subscribe(data => {
     this._snackBar.open('Approve With Exception Reason Details', 'Saved', {
       duration: 1500
     });
     this._modalRef.close(data);
   });
   }
  }

  public getFields() {
    this.fields = this._service.getFormlyFields();
  }

  cancel() {
    this._modalRef.close();
  }

}


