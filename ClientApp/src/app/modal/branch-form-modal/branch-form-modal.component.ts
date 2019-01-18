import { Component, OnInit, Inject } from '@angular/core';
import { BranchFormModalService } from './branch-form-modal.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { CustomerProfileService } from 'src/app/customer-profile/customer-profile.service';
import { PaddingDecimalFieldsService } from 'src/app/services/padding-decimal-fields.service';
import { forkJoin } from 'rxjs';
import { MidListModalService } from '../mid-list-modal/mid-list-modal.service';

@Component({
  selector: 'app-branch-form-modal',
  templateUrl: './branch-form-modal.component.html',
  styleUrls: ['./branch-form-modal.component.css'],
  providers: [BranchFormModalService, CustomerProfileService]
})
export class BranchFormModalComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };

  constructor(private _modalRef: MatDialogRef<BranchFormModalComponent>, private _branchService: BranchFormModalService,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any,
    private _snackBar: MatSnackBar, private _customerProfileService: CustomerProfileService,
    private _decimalService: PaddingDecimalFieldsService,
    private _midService: MidListModalService) {
    this.model = {};
    this.model['id'] = 0;
    if (this.matDialogData['newAffiliationId']) {
      forkJoin([
        this._customerProfileService.get(this.matDialogData['newAffiliationId']),
        this._midService.getDefaultMonitorCodes()
      ]).subscribe(fjData => {
        this.model = this.matDialogData['branch'];
        this.model['registeredBusinessNo'] = fjData[0]['registeredBusinessNumber'];
        this.model['monitorCodeList'] = fjData[1];

        this.fields = this._branchService.getBranchFields(this.matDialogData['userGroup']);
      });
    } else {
      this._midService.getDefaultMonitorCodes().subscribe(mc => {
        this.model = Object.assign({}, matDialogData['branch']);
        this.model['mdrAtm'] = this._decimalService.modifyDecimalFields(this.model['mdrAtm']);
        this.model['mdrSmGiftCard'] = this._decimalService.modifyDecimalFields(this.model['mdrSmGiftCard']);
        this.model['mdrSmShopCard'] = this._decimalService.modifyDecimalFields(this.model['mdrSmShopCard']);
        this.model['mdrCashAgad'] = this._decimalService.modifyDecimalFields(this.model['mdrCashAgad']);
        this.model['discountDebitRate'] = this._decimalService.modifyDecimalFields(this.model['discountDebitRate']);
        this.model['merchDiscountRateDebitCrd'] = this._decimalService.modifyDecimalFields(this.model['merchDiscountRateDebitCrd']);
        this.model['monitorCodeList'] = mc;
        this.fields = this._branchService.getBranchFields(this.matDialogData['userGroup']);
      });
    }
  }

  ngOnInit() {
    this.form = new FormGroup({});
  }

  submit() {
    if (this.model['id']) {
      this._branchService.update(this.model['id'], this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Branch Details', 'Updated', {
          duration: 1000
        });
        snackBarRef.afterDismissed().subscribe(x => {
          this._modalRef.close(data);
        });
      });
    } else {
      this._branchService.create(this.model).subscribe(data => {
        const snackBarRef = this._snackBar.open('Branch Details', 'Saved', {
          duration: 1000
        });
        snackBarRef.afterDismissed().subscribe(x => {
          this._modalRef.close(data);
        });
      });
    }
  }

  cancel() {
    this._modalRef.close();
  }
}
