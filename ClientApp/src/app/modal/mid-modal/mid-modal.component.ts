import { Component, OnInit } from '@angular/core';
import { MidModalService } from './mid-modal.service';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mid-modal',
  templateUrl: './mid-modal.component.html',
  styleUrls: ['./mid-modal.component.css'],
  providers: [MidModalService]
})
export class MidModalComponent implements OnInit {
  form: FormGroup;
  constructor(private _dialogRef: MatDialogRef<MidModalComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({
      mid: new FormControl('', [
        Validators.pattern('\d+')
      ])
    });
  }

  Submit() {
    this._dialogRef.close(this.form.value);
  }
}
