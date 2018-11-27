import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentChecklistMaintenanceFormService } from './document-checklist-maintenance-form.service';
import { AppBaseComponent } from '../../../../../app/app-base/app-base.component';

@Component({
  selector: 'app-document-checklist-maintenance-form',
  templateUrl: './document-checklist-maintenance-form.component.html',
  styleUrls: ['./document-checklist-maintenance-form.component.css'],
  providers: [DocumentChecklistMaintenanceFormService]
})
export class DocumentChecklistMaintenanceFormComponent implements OnInit {
  @Input() displayMode: boolean = false;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };
  title: string = 'Document Checklist Maintenance Form';
  subTitle: string;
  mode: string;
  fields: FormlyFieldConfig[];

  constructor(private _service: DocumentChecklistMaintenanceFormService,
              private _matDialogRef: MatDialogRef<DocumentChecklistMaintenanceFormComponent>) {
    this.fields = _service.getDocumentListFields();
  }
  
  ngOnInit() {
  }

  submit() {
    this._matDialogRef.close(this.form.value.Description);
  }

  cancel() {
    this._matDialogRef.close();
  }

}
