import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentCheckListFormService } from './document-check-list-form.service';


@Component({
  selector: 'app-document-check-list-form',
  templateUrl: './document-check-list-form.component.html',
  styleUrls: ['./document-check-list-form.component.css'],
  providers: [DocumentCheckListFormService]
})
export class DocumentCheckListFormComponent implements OnInit {
  documentForm: FormGroup;
  documentList: Object[];

  constructor(private _route: ActivatedRoute, private _router: Router, private _service: DocumentCheckListFormService) { }

  ngOnInit() {
    this.documentForm = new FormGroup({
      documentName: new FormControl(''),
      remarks: new FormControl(''),
      targetDateOfSubmission: new FormControl(''),
      fileUpload: new FormControl('')
    });

    this.documentList = this._service.getDocumentList();
  }

  OnSubmit() {
    console.log(this.documentForm.value);
  }
  Cancel() {
    const parentRoute = this._router.url.split('/(')[0];
    console.log(parentRoute);
    this._router.navigateByUrl(`${parentRoute}`);
  }
}
