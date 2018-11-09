import { Component, OnInit, Inject,Injectable } from '@angular/core';
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
  selectedValue: string;
  aoSelectFrmControl: FormControl;
  constructor(private _matDialogRef: MatDialogRef<AoListModalComponent>,
    private _service: AoListModalService,
    @Inject(MAT_DIALOG_DATA) private _passedData: any) { }

  ngOnInit() {
    this._service.getAoList().subscribe(x => {
      this.dataSource = x;
    });
    this.passedData = this._passedData;
    this.selectedValue = 'Not yet assigned!';
    this.aoSelectFrmControl = new FormControl();
  }

  Cancel() {
    this._matDialogRef.close();
  }

  Submit() {
    this._matDialogRef.close(this.aoSelectFrmControl.value);
  }

  closeDialog() {
    this._matDialogRef.close();
  }

}
