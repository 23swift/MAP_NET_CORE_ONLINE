import { Component, OnInit, Inject } from '@angular/core';
import { OifFormModalService } from './oif-form-modal.service';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-oif-form-modal',
  templateUrl: './oif-form-modal.component.html',
  styleUrls: ['./oif-form-modal.component.css'],
  providers: [OifFormModalService]
})
export class OifFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };
  displayMode = false;

  constructor(private _oifService: OifFormModalService,
    private _modalRef: MatDialogRef<OifFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, private _snackBar: MatSnackBar) {
    this.fields = this._oifService.getOIFFields();

    forkJoin([
      this._oifService.getByBranch(this.dialogData['branchId']),
      this._oifService.getBranchDetails(this.dialogData['branchId'])
    ]).subscribe(data => {
      this.model = data[0] || {
        branchId: this.dialogData['branchId']
      };
      this.model['dbaName'] = data[0].dbaName || data[1].dbaName;
      this.model['dbaAddress1'] = data[0].dbaAddress1 || data[1].dbaAddress1;
      this.model['dbaAddress2'] = data[0].dbaAddress2 || data[1].dbaAddress2;
      this.model['dbaAddress3'] = data[0].dbaAddress3 || data[1].dbaAddress3;
      this.model['dbaAddress4'] = data[0].dbaAddress4 || data[1].dbaAddress4;
      this.model['dbaCity'] = data[0].dbaCity || data[1].dbaCity;
      this.model['adminContactPerson'] = data[0].adminContactPerson || data[1].adminContactPerson;
      this.model['branchPhoneNumber'] = data[0].branchPhoneNumber || data[1].branchPhoneNumber;
      this.model['branchMobileNumber'] = data[0].branchMobileNumber || data[1].branchMobileNumber;
    });
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._oifService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('OIF Details', 'Updated', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    } else {
      this._oifService.create(this.model).subscribe(data => {
        this._snackBar.open('OIF Details', 'Saved', {
          duration: 1500
        });
        this._modalRef.close(data);
      });
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
