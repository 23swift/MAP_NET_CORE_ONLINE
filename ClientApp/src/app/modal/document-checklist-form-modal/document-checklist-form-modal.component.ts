import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DocumentCheckListService } from 'src/app/document-check-list/document-check-list.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Input } from '@angular/compiler/src/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DocumentChecklistFormModalService } from './document-checklist-form-modal.service';

@Component({
  selector: 'app-document-checklist-form-modal',
  templateUrl: './document-checklist-form-modal.component.html',
  styleUrls: ['./document-checklist-form-modal.component.css'],
  providers: [DocumentCheckListService, DocumentChecklistFormModalService]
})
export class DocumentChecklistFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };

  file: string | ArrayBuffer;
  isSubmitted = false;

  constructor(private _docuService: DocumentCheckListService, private _modalRef: MatDialogRef<DocumentChecklistFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, private _snackBar: MatSnackBar,
    private _documentService: DocumentChecklistFormModalService) {
      this.model = dialogData['document'];
      this.model['documentName'] = +this.model['documentName'];
      delete this.model['fileUpload'];
  }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._documentService.getFormlyFields();
  }

  submit() {
    const base64file = this.file ? this.file.toString().split(',')[1] : null;
    this.model['fileUpload'] = base64file;
    this.model['submitted'] = this.model['submitted'] || base64file ? true : false;

    this._docuService.update(this.model['id'], this.model).subscribe(data => {
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
