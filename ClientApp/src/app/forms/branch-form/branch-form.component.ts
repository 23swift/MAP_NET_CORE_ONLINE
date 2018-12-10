import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppBaseComponent } from '../../app-base/app-base.component';
import { BranchFormService } from '../branch-form/branch-form.service';
import { FormlyFieldConfigService } from '../../services/formly-field-config.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.css']
})
export class BranchFormComponent implements OnInit {
  @Input() displayMode: boolean;
  @Input() branchId: number;
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  };
  fields: FormlyFieldConfig[];
  title = 'Branch Affiliation';
  isSaved = false;
  subTitle: string;
  mode: string;
  backUrl: string;
  constructor(private _branchService: BranchFormService, public route: ActivatedRoute,
    public router: Router, private _formService: FormlyFieldConfigService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.title = 'Branch';

    this._branchService.get(this.branchId).subscribe(b => {
      this.model = b;
      this.fields = this._branchService.getBranchFields('mdcsEncoder');
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
