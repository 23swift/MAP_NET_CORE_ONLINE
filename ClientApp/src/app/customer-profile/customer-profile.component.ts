import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { CustomerProfileService } from './customer-profile.service';
import { AppBaseComponent } from '../app-base/app-base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFieldConfigService } from '../services/formly-field-config.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
  providers: [CustomerProfileService, FormlyFieldConfigService]
})
export class CustomerProfileComponent extends AppBaseComponent implements OnInit {
  @Input() displayMode = false;
  @Input() userGroup: string;
  @Output() newAffiliationId = new EventEmitter<number>();

  isSaved = false;
  customerProfileId = 0;
  model: CutomerProfile;
  title = 'New Affiliation';

  options: FormlyFormOptions = {
    formState: {
      disabled: true
    }
  };

  constructor(public route: ActivatedRoute,
    public router: Router,
    private _customerProfileService: CustomerProfileService,
    private _formlyFieldConfigService: FormlyFieldConfigService,
    private _snackBar: MatSnackBar
  ) {
    super(route, router);

    this.route.params.subscribe(data => {
      if (data['id']) {
        this._customerProfileService.get(data['id']).subscribe(cpData => {
          this.model = cpData;
          this.newAffiliationId.emit(cpData['newAffiliationId']);
          this.customerProfileId = this.model['id'];
          this.newAffiliationId = this.model['newAffiliationId'];
          this.isSaved = true;
        });
      } else {
        console.log('NO ID');
      }
    });
  }

  ngOnInit() {
    // this.initialize();
    this.fields = this._customerProfileService.getCustomerProfileFields(this.userGroup);
    // apply expressionProperty for disabled based on formState to all fields
    if (this.displayMode === true) {
      this._formlyFieldConfigService.disabled(this.fields);
    } else {
      this._formlyFieldConfigService.enabled(this.fields);
    }
  }

  submit() {
    if (this.model['id']) {
      console.log(this.model);
      this._customerProfileService.update(this.model['id'], this.model).subscribe(data => {
        this._snackBar.open('Customer Profile', 'Updated', {
          duration: 1500
        });
      });
    } else {
      this._customerProfileService.create(this.model).subscribe(data => {
        this.model['id'] = data['id'];
        this.newAffiliationId.emit(data['newAffiliationId']);
        this.customerProfileId = this.model['id'];
        this.newAffiliationId = this.model['newAffiliationId'];
        this.isSaved = true;

        this._snackBar.open('Customer Profile', 'Saved', {
          duration: 1500
        });
      });
    }
  }
}


interface CutomerProfile {
  businessName: string;
  ownership: number;
  dtiRegDate: Date;
}
