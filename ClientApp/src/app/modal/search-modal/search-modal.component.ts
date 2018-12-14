import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SearchModalService } from './search-modal.service';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css'],
  providers: [SearchModalService]
})
export class SearchModalComponent implements OnInit {
  form: FormGroup;
  model: Object;
  userGroup: string;
  fields: FormlyFieldConfig[];

  constructor(private _matDialogRef: MatDialogRef<SearchModalComponent>,
    @Inject(MAT_DIALOG_DATA)public dialogData: any,
    private _service: SearchModalService) {
      this.userGroup = this.dialogData['userGroup'];
      this.fields = this._service.getFields(this.userGroup);
    }

  ngOnInit() {
    this.form = new FormGroup({});
    this.model = {};
  }

  closeDialog() {
    this._matDialogRef.close();
  }

  submit() {
    this._matDialogRef.close(this.model);
  }

}
