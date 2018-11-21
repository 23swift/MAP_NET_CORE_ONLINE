import { Component, OnInit } from '@angular/core';
import { RequestFormService } from './request-form.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
  providers: [RequestFormService]
})
export class RequestFormComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  options: {};
  fields: FormlyFieldConfig[] = [{
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        key: 'rtNo',
        type: 'input',
        defaultValue: '0000001',
        expressionProperties: {
          'templateOptions.disabled': 'true'
        },
        templateOptions: {
          label: "Reference #"
        }
      },
      {
        className: 'flex-1',
        key: 'dateRequested',
        type: 'calendar',
        defaultValue: new Date(),
        expressionProperties: {
          'templateOptions.disabled': 'true'
        },
        templateOptions: {
          label: 'Date Requested'
        }
      }
    ]
  }, {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        key: 'status',
        type: 'input',
        defaultValue: 'DECLINED',
        expressionProperties: {
          'templateOptions.disabled': 'true'
        },
        templateOptions: {
          label: "Status"
        }
      },
      {
        className: 'flex-1',
        key: 'aoCode',
        type: 'input',
        defaultValue: 'AO001',
        expressionProperties: {
          'templateOptions.disabled': 'true'
        },
        templateOptions: {
          label: 'AO Code'
        }
      }
    ]
  }, {
    fieldGroupClassName: 'display-flex',
    template: '<h1 class="mat-display-1">Business Information</h1>'
  }, {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        key: 'businessName',
        type: 'input',
        templateOptions: {
          label: "Business Name"
        }
      },
      {
        className: 'flex-1',
        key: 'ownership',
        type: 'select',
        templateOptions: {
          label: 'Ownership',
          options: [{
            label: 'Single Proprietorship',
            value: 1
          }, {
            label: 'Partnership',
            value: 2
          }, {
            label: 'Corporation',
            value: 3
          }, {
            label: 'Cooperative',
            value: 4
          }, {
            label: 'Others',
            value: 5
          }]
        }
      }
    ]
  }, {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        key: 'secDtiRegDate',
        type: 'calendar',
        templateOptions: {
          label: "SEC DTI Registration Date"
        }
      },
      {
        className: 'flex-1',
        template: '<p></p>'
      }
    ]
  }];

  constructor(private requestService: RequestFormService) { }

  ngOnInit() {
  }

  Cancel() { }
  Get() { }
  GetById() { }
  Submit() { }
  Update() { }
  Save() {

  }
}
