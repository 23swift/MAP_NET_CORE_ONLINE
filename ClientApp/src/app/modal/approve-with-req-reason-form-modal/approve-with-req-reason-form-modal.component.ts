import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ApproveWithReqReasonFormModalService } from './approve-with-req-reason-form-modal.service';

@Component({
  selector: 'app-approve-with-req-reason-form-modal',
  templateUrl: './approve-with-req-reason-form-modal.component.html',
  styleUrls: ['./approve-with-req-reason-form-modal.component.css'],
  providers: [ApproveWithReqReasonFormModalService]
})
export class ApproveWithReqReasonFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options = {};
  
  constructor(private _modalRef: MatDialogRef<ApproveWithReqReasonFormModalComponent>, private _service: ApproveWithReqReasonFormModalService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = new FormGroup({});

    this.fields = this._service.getFormlyFields();
    this.model = {};
  }

  submit() {
    this._modalRef.close();
  }

  cancel() {
    this._modalRef.close();
  }

}

