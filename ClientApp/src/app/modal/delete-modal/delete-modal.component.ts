import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  constructor(
    private _modalRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  submit() {
    this._dialogData['delete'].subscribe(d => {
      const snackBarRef = this._snackBar.open('DELETE ENTRY', 'SUCCESS', {
        duration: 1000
      });
      snackBarRef.afterDismissed().subscribe(x => {
        this._modalRef.close();
      });
    });
  }

  cancel() {
    this._modalRef.close();
  }
}
