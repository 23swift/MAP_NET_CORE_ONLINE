import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ApproveWithExceptReasonDetailsModalService } from './approve-with-except-reason-details-modal.service';

@Component({
  selector: 'app-approve-with-except-reason-details-modal',
  templateUrl: './approve-with-except-reason-details-modal.component.html',
  styleUrls: ['./approve-with-except-reason-details-modal.component.css'],
  providers: [ApproveWithExceptReasonDetailsModalService]
})
export class ApproveWithExceptReasonDetailsModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options = {};
  
  constructor(private _modalRef: MatDialogRef<ApproveWithExceptReasonDetailsModalComponent>, private _service: ApproveWithExceptReasonDetailsModalService, @Inject(MAT_DIALOG_DATA) public data: any) { }

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


