import { Component, OnInit } from '@angular/core';
import { BranchFormService } from '../forms/branch-form/branch-form.service';
import { FieldType } from '@ngx-formly/material';
import { MatDialog } from '@angular/material';
import { PrintDebitModalComponent } from '../modal/print-debit-modal/print-debit-modal.component';

@Component({
  selector: 'app-print-debit-facility-type',
  templateUrl: './print-debit-facility-type.component.html',
  styleUrls: ['./print-debit-facility-type.component.css']
})
export class PrintDebitFacilityTypeComponent extends FieldType implements OnInit {

  constructor(private branchFormService: BranchFormService, private _modalDialog: MatDialog) {
    super()
  }

  ngOnInit() {
    
  }

  print() {
    //this.branchFormService.printAdmrc(this.model);
    //console.log(this.model);
    // window.print();
    // this.branchFormService.printDebit(this.model).subscribe(x => { });
    this._modalDialog.open(PrintDebitModalComponent, {
      data: this.model,
      width: '800px'
    });
  }

}
