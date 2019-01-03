import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { RemarksModalService } from './remarks-modal.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MaefFormService } from '../../forms/maef-form/maef-form.service';



export interface RemModal {
  remarks: string;
}

@Component({
  selector: 'app-remarks-modal',
  templateUrl: './remarks-modal.component.html',
  styleUrls: ['./remarks-modal.component.css'],
  providers: [RemarksModalService, MaefFormService]
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

  constructor(private _modalRef: MatDialogRef<RemarksModalComponent>, private _remarksModalService: RemarksModalService, private _maefFormService: MaefFormService, @Inject(MAT_DIALOG_DATA) public data: any,
  private _snackBar: MatSnackBar,) {
    this.form = new FormGroup({
      remarks: new FormControl('')
    });

    this.date = new Date().toLocaleDateString();
   
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

  ngOnInit() {
    this.model = { remarks: '', requestId: this.data['newAffiliationId'], user: '', groupCode: '', action: '', date: '' };
    
  }

  save() {
    this.model['remarks'] = this.form.value['remarks'];
    this.model['user'] = 'user';
    this.model['groupCode'] = 'mauEncoder';
    this.model['action'] =this.data['actionCode'] + ':Save Remarks';
    this.model['actionCode'] =this.data['actionCode'];
    this.model['date'] =  this.date;
    this.model['id'] = undefined;
    this._remarksModalService.create(this.model).subscribe(data => {
      const snackBarRef = this._snackBar.open( this.data['actionCode'] + ' Details', 'Saved', {
        duration: 1000
      });
      this.showSubmit = false;
      this.showEdit = true;
      this.form.get('remarks').disable();      
      snackBarRef.afterDismissed().subscribe(s => {
        //this._modalRef.close(data);
      });
    }); 
  }

  update() {
    if (this.data['actionCode'] == 'Return To AO')
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
