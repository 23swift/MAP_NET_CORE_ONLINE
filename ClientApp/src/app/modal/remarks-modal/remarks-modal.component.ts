import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { RemarksModalService } from './remarks-modal.service';

export interface RemModal {
  remarks: string;
}

@Component({
  selector: 'app-remarks-modal',
  templateUrl: './remarks-modal.component.html',
  styleUrls: ['./remarks-modal.component.css'],
  providers: [RemarksModalService]
})

export class RemarksModalComponent implements OnInit {
  form: FormGroup;

  constructor(private _modalRef: MatDialogRef<RemarksModalComponent>) {
    this.form = new FormGroup({
      remarks: new FormControl('')
    });
  }

  ngOnInit() {
  }

  submit() {
    this._modalRef.close(this.form.value);
  }
  save() {
  }
  getItem() {

  }
}
