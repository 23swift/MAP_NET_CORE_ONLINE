import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-outskirt-reminder-modal',
  templateUrl: './outskirt-reminder-modal.component.html',
  styleUrls: ['./outskirt-reminder-modal.component.css']
})
export class OutskirtReminderModalComponent implements OnInit {
  passedData: any;
  constructor(private _matDialogRef: MatDialogRef<OutskirtReminderModalComponent>, @Inject(MAT_DIALOG_DATA) private _passedData: any) { 

  }

  ngOnInit() {
    this.passedData = this._passedData;
  }
  
  closeDialog() {
    this._matDialogRef.close(this.passedData);
  }

}
