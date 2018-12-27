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
  request: Object;
  disable: boolean;

  constructor(private _modalRef: MatDialogRef<RemarksModalComponent>, private _remarksModalService: RemarksModalService, private _maefFormService: MaefFormService, @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar, ) {
    this.form = new FormGroup({
      remarks: new FormControl('')
    });

    this.date = new Date().toLocaleDateString();
    // this._maefFormService.getRemarks(5).subscribe(data => {
    //   this.model = data;
    //   this.form.controls['remarks'].setValue(this.model['remarks']);
    // });


  }

  ngOnInit() {
    this.model = { remarks: '', requestId: this.data, user: '', groupCode: '', action: '', date: '' };

    if (this.form.value['remarks'] == '') {
      this.form.get('remarks').disable();
    }
  }

  save() {
    this.model['remarks'] = this.form.value['remarks'];
    this.model['user'] = 'user';
    this.model['groupCode'] = 'mauEncoder';
    this.model['action'] = 'Return Request';
    this.model['date'] = this.date;
    this.model['id'] = undefined;
    console.log(this.model);
    this._remarksModalService.create(this.model).subscribe(data => {
      const snackBarRef = this._snackBar.open('Return Request Details', 'Saved', {
        duration: 1000
      });

      snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close(data);
      });
    });
  }

  update() {
    // this._maefFormService.ReturntoAO(this.data).subscribe(data => {
    //   const snackBarRef = this._snackBar.open('Return To AO', 'Saved', {
    //     duration: 1000
    //   });

      // snackBarRef.afterDismissed().subscribe(s => {
        this._modalRef.close();
      // });
    // });
  }

  editRemarks() {
    this.form.get('remarks').enable();
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
