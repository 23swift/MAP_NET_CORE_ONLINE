import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PrintDebitModalService } from './print-debit-modal.service';

@Component({
  selector: 'app-print-debit-modal',
  templateUrl: './print-debit-modal.component.html',
  styleUrls: ['./print-debit-modal.component.css']
})
export class PrintDebitModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) private _passedData: any,
    private _service: PrintDebitModalService,
    private _matDialofRef: MatDialogRef<PrintDebitModalComponent>) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = this._service.main;
    this.model = {};
    this.model['settlementAccNoForDebit'] = this._passedData['settlementAccNoForDebit'];
    this.model['payeesName'] = this._passedData['payeesName'];
    this.model['emailAddressForReportDist'] = this._passedData['emailAddressForReportDist'];
    this.model['mailingAddressForPaymentDel'] = this._passedData['mailingAddressForPaymentDel'];
    this.model['reportSetting'] = this._passedData['reportSetting'];
    this.model['emailAddressForReportSetting'] = this._passedData['emailAddressForReportSetting'];
    this.model['storeId'] = this._passedData['storeId'];
    this.model['debitFacilityRemarks'] = this._passedData['debitFacilityRemarks'];
  }

  printToWindow() {
      window.print();
  }

  submit() {
    
  }
}
