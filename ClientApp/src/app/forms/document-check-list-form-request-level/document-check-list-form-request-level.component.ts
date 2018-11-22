import { Component, OnInit } from '@angular/core';
import { DocumentCheckListFormRequestLevelService } from './document-check-list-form-request-level.service';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-document-check-list-form-request-level',
  templateUrl: './document-check-list-form-request-level.component.html',
  styleUrls: ['./document-check-list-form-request-level.component.css'],
  providers: [DocumentCheckListFormRequestLevelService]
})
export class DocumentCheckListFormRequestLevelComponent implements OnInit {
  documentForm: FormGroup;
  documentList: Object[];

  constructor(private _route: ActivatedRoute, private _router: Router, private _service: DocumentCheckListFormRequestLevelService) { }

  ngOnInit() {
    this.documentForm = new FormGroup({
      documentName: new FormControl('')
    });

    this.documentList = this._service.GetDocumentList();
  }

  submit() {
    console.log(this.documentForm.value);
  }

  cancel() {
    const parentRoute = this._router.url.split('/(')[0];
    console.log(parentRoute);
    this._router.navigateByUrl(`${parentRoute}`);
  }
}
