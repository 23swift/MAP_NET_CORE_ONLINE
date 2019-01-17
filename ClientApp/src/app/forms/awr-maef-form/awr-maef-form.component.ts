import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { AwrMaefFormService } from './awr-maef-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';


@Component({
  selector: 'app-awr-maef-form',
  templateUrl: './awr-maef-form.component.html',
  styleUrls: ['./awr-maef-form.component.css'],
  providers: [AwrMaefFormService]
})
export class AwrMaefFormComponent implements OnInit {
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model = {};
  options: FormlyFormOptions = {
    showError: () => {
      return true;
    }
  }
  requestId: number;
  maefId: number;
  hasData: boolean;
  @Output() tabIndex = new EventEmitter<number>();

  constructor(private _awrMaefFormService: AwrMaefFormService, private _route: ActivatedRoute, private _matDialog: MatDialog, private _snackBar: MatSnackBar) {
    this.requestId = +this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.hasData = false;
    this.form = new FormGroup({});
    this.fields = this._awrMaefFormService.GetFormlyFields();
    this.loadAwrForm();
  }

  Submit() {
    this.model['requestId'] = this.requestId;
    if (this.model['id']) {
      this._awrMaefFormService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('AWR MAEF Details', 'Updated!', {
          duration: 2000
        });
        this.model = data;
      });
    } else {
      this.model['MAEFId'] = this.maefId;
      this._awrMaefFormService.create(this.model).subscribe(data => {
        this._snackBar.open('AWR MAEF Details', 'Saved!', {
          duration: 2000
        });
        this.model = data;
      });
    }
  }

  loadAwrForm() {
    this._awrMaefFormService.getAwrMaefData(this.requestId).subscribe(data => {
      this._awrMaefFormService.getMaefId(this.requestId).subscribe(data => {
        this.maefId = data;
        this._awrMaefFormService.GetById(this.requestId).subscribe(data => {
          this.model = data;
        });
        this.hasData = true;
      });
    });
  }

  Cancel() {
    if (this.model['id']) {
      this._awrMaefFormService.deleteAwrMaef(this.model['id'], this.model).subscribe(data => {
        this._awrMaefFormService.removeAppExAwrDetails(this.maefId).subscribe(data => {
          this._snackBar.open('AWR MAEF', 'Canceled!', {
            duration: 2000
          });
        });
        this.tabIndex.emit(3);
        this.hasData = false;
      });

    } else {
      this._awrMaefFormService.removeAppExAwrDetails(this.maefId).subscribe(data => {
        this._snackBar.open('AWR MAEF', 'Canceled!', {
          duration: 2000
        });
        this.tabIndex.emit(3);
        this.hasData = false;
      });
    }
  }
}
