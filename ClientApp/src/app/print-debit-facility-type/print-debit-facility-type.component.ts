import { Component, OnInit } from '@angular/core';
import { BranchFormService } from '../forms/branch-form/branch-form.service';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-print-debit-facility-type',
  templateUrl: './print-debit-facility-type.component.html',
  styleUrls: ['./print-debit-facility-type.component.css']
})
export class PrintDebitFacilityTypeComponent extends FieldType implements OnInit {

  constructor(private branchFormService: BranchFormService) {
    super()
  }

  ngOnInit() {
    
  }

  print() {
    //this.branchFormService.printAdmrc(this.model);
    //console.log(this.model);
    // window.print();
    this.branchFormService.printDebit(this.model).subscribe(x => { });
  }

}
