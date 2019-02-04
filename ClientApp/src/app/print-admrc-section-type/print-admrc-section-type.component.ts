import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';
import { BranchFormService } from '../forms/branch-form/branch-form.service';

@Component({
  selector: 'app-print-admrc-section-type',
  templateUrl: './print-admrc-section-type.component.html',
  styleUrls: ['./print-admrc-section-type.component.css']
})
export class PrintAdmrcSectionTypeComponent extends FieldType implements OnInit {

  constructor(private branchFormService: BranchFormService) {
    super()
  }

  ngOnInit() {
  }

  print() {
    this.branchFormService.printAdmrc(this.model);
    //console.log(this.model);
    // window.print();
  }

}
