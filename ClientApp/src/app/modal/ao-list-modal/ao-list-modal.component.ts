import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AoListModalService } from './ao-list-modal.service';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-ao-list-modal',
  templateUrl: './ao-list-modal.component.html',
  styleUrls: ['./ao-list-modal.component.css'],
  providers: [AoListModalService]
})

export class AoListModalComponent implements OnInit {
  dataSource: any;
  passedData: any;
  aoList: any;
  currentOwner: any;
  isAssignedRequest: boolean;
  selectedItem: any;
  aoSelectFrmControl: FormControl;
  constructor(private _matDialogRef: MatDialogRef<AoListModalComponent>,
    private _service: AoListModalService,
    @Inject(MAT_DIALOG_DATA) private _passedData: any) { }

  ngOnInit() {
    this._service.getAoList().subscribe(x => {
      this.dataSource = x;
    });
    this.passedData = this._passedData;
    this._service.getByUserName(this.passedData.UserName).subscribe(x => {
      this.aoList = x;
      // console.log(this.aoList);
      this.currentOwner = this.aoList == undefined ? 'Not Yet Assigned' : this.aoList.firstName + ' ' + this.aoList.lastName;
      this.isAssignedRequest = this.aoList == undefined ? false : true;
    });
    this.aoSelectFrmControl = new FormControl();
  }

  Cancel() {
    this._matDialogRef.close();
  }

  Save() {
    this.selectedItem = this.aoSelectFrmControl.value;
    // console.log(this.passedData.Id + ' ' + this.selectedItem.userId)
    this._service.setOwnerofRequest(this.passedData.Id, this.selectedItem.userId).subscribe(x => {
      this._matDialogRef.close(this.selectedItem);
    });
  }

  closeDialog() {
    this._matDialogRef.close();
  }

}
