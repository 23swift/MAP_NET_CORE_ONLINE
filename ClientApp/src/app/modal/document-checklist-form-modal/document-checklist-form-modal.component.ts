import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DocumentCheckListService } from 'src/app/document-check-list/document-check-list.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Input } from '@angular/compiler/src/core';

@Component({
  selector: 'app-document-checklist-form-modal',
  templateUrl: './document-checklist-form-modal.component.html',
  styleUrls: ['./document-checklist-form-modal.component.css'],
  providers: [DocumentCheckListService]
})
export class DocumentChecklistFormModalComponent implements OnInit {
  documentForm: FormGroup;
  documentList: Object[];
  file: string | ArrayBuffer;
  isSubmitted = false;

  constructor(private _docuService: DocumentCheckListService, private _modalRef: MatDialogRef<DocumentChecklistFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, private _snackBar: MatSnackBar) {
    this.documentForm = new FormGroup({
      documentName: new FormControl(''),
      remarks: new FormControl(''),
      targetDateOfSubmission: new FormControl(''),
      submitted: new FormControl(''),
      newAffiliationId: new FormControl(''),
      id: new FormControl('')
    });


    this.documentForm.setValue({
      documentName: +dialogData.document['documentName'],
      remarks: dialogData.document['remarks'],
      targetDateOfSubmission: dialogData.document['targetDateOfSubmission'],
      submitted: dialogData.document['submitted'],
      newAffiliationId: dialogData.document['newAffiliationId'],
      id: dialogData.document['id']
    });
  }

  ngOnInit() {
    this.documentList = this._docuService.getDocumentChecklist();
  }

  submit() {
    const base64file = this.file ? this.file.toString().split(',')[1] : null;

    const model = {
      documentName: this.documentForm.value['documentName'],
      remarks: this.documentForm.value['remarks'],
      targetDateOfSubmission: this.documentForm.value['targetDateOfSubmission'],
      fileUpload: base64file,
      submitted: this.documentForm.value['submitted'] || base64file ? true : false,
      newAffiliationId: this.documentForm.value['newAffiliationId'],
      id: this.documentForm.value['id']
    };

    this._docuService.update(model['id'], model).subscribe(data => {
      this._snackBar.open('Document Checklist Details', 'Updated', {
        duration: 1500
      });
      this._modalRef.close();
    });
  }

  changeListener($event) {
    this.readThis($event.target);
  }

  onClickSubmitted($event) {
    this.isSubmitted = $event.checked;
  }

  readThis(inputValue: any) {
    const file: File = inputValue.files[0];
    if (file) {
      const myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
        this.file = myReader.result;
      };

      myReader.readAsDataURL(file);
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
