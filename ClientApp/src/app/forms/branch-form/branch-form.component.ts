import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, SimpleChange, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig, FieldArrayType } from '@ngx-formly/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';
import { BranchFormService } from '../branch-form/branch-form.service';
import { FormlyFieldConfigService } from '../../services/formly-field-config.service';
import { MatSnackBar } from '@angular/material';
import { PaddingDecimalFieldsService } from 'src/app/services/padding-decimal-fields.service';
import { forkJoin } from 'rxjs';
import { BranchListAttachmentPOSRequestComponent } from 'src/app/branch-list-attachment-posrequest/branch-list-attachment-posrequest.component';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.css'],
  providers: [BranchFormService]
})
export class BranchFormComponent implements OnInit {
  @Input() displayMode: boolean;
  @Input() branchId: number;
  @Input() userGroup: string;
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: Object;
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };
  title = 'Branch Affiliation';
  isSaved = false;
  subTitle: string;
  mode: string;
  backUrl: string;
  constructor(private _branchService: BranchFormService, public route: ActivatedRoute,
    public router: Router, private _formService: FormlyFieldConfigService, private _snackBar: MatSnackBar,
    private _decimalService: PaddingDecimalFieldsService) {
  }


  ngOnInit() {
    this.title = 'Branch';
    this.form = new FormGroup({});

    if (this.userGroup === 'mdcs') {
      this._branchService.verifyCustomerOwnership(this.branchId).subscribe(isSingleProp => {
        if (isSingleProp) {
          forkJoin([
            this._branchService.getFirstOrDefaultOwnerByBranch(this.branchId),
            this._branchService.get(this.branchId)
          ]).subscribe(fjData => {
            const owner = fjData[0];
            this.model = fjData[1];
            this.model['ownerName'] = this.model['ownerName'] === '' ? owner['name'] : this.model['ownerName'];
            this.model['isSingleProp'] = isSingleProp;
            this._decimalService.modifyDecimalFields(this.model);
            this.fields = this._branchService.getBranchFields(this.userGroup);
          });
        } else {
          this.getBranch();
        }
      });
    } else {
      this.getBranch();
    }
  }

  getBranch() {
    this._branchService.get(this.branchId).subscribe(b => {
      this.model = b;
      this.model['isSingleProp'] = false;
      this._decimalService.modifyDecimalFields(this.model);
      this.fields = this._branchService.getBranchFields(this.userGroup);
    });
  }

  submit() {
    this._branchService.update(this.model['id'], this.model).subscribe(data => {
      const snackBarRef = this._snackBar.open('Branch Details', 'Updated', {
        duration: 1000
      });
    });
  }

  cancel() {
    this.router.navigateByUrl(this.backUrl);
  }
}
