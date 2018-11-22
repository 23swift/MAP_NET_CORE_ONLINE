import { Component, OnInit, Inject } from '@angular/core';
import { DocumentPerRequestModalService } from './document-per-request-modal.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-document-per-request-form-modal',
  templateUrl: './document-per-request-form-modal.component.html',
  styleUrls: ['./document-per-request-form-modal.component.css'],
  providers: [DocumentPerRequestModalService]
})
export class DocumentPerRequestFormModalComponent implements OnInit {
  documentForm: FormGroup;
  documentList: Object[];
  newAffiliationId: number;
  constructor(private _docService: DocumentPerRequestModalService,
    private _modalRef: MatDialogRef<DocumentPerRequestFormModalComponent>,
    @Inject(MAT_DIALOG_DATA)public dialogData: any,
    private _snackBar: MatSnackBar) {
      this.newAffiliationId = dialogData['newAffiliationId'];
    }

  ngOnInit() {
    this.documentForm = new FormGroup({
      documentName: new FormControl('')
    });

    this.documentList = this._docService.getDocumentList();
  }

  submit() {
    this._docService.addToRequest(this.newAffiliationId, this.documentForm.value['documentName']).subscribe(data => {
      this._snackBar.open('Document Checklist', 'Added', {
        duration: 1500
      });
      this._modalRef.close();
    });
  }

  cancel() {
    this._modalRef.close();
  }
}
