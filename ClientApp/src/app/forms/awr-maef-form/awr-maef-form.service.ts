import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AwrMaefFormService {
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1 break-word',
          type: 'input',
          key: 'accountOfficer',
          templateOptions: {
            label: 'Account Officer',
            placeholder: 'Account Officer',
            disabled: true
          },
        },
        {
          className: 'flex-1 break-word',
          type: 'input',
          key: 'aoInsuffCount',
          templateOptions: {
            label: 'AO Insuff Count',
            placeholder: 'AO Insuff Count',
            disabled: true
          },
        },
        {
          className: 'flex-1 break-word',
          type: 'input',
          key: 'mpHeadInsuffThreshold',
          templateOptions: {
            label: 'MP Head Insuff Threshold',
            placeholder: 'MP Head Insuff Threshold',
            disabled: true
          },
        },
      ]
    },
    {
      template: '<div class="display-flex"><span class="mat-headline">EVALUATION / JUSTIFICATION</span></div>',
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1 break-word',
          type: 'input',
          key: 'exceptionRemarks',
          templateOptions: {
            label: 'Exception Remarks',
            placeholder: 'Exception Remarks',
            disabled: true
          },
        },
        {
          className: 'flex-1 break-word',
          type: 'input',
          key: 'processedBy',
          templateOptions: {
            label: 'Processed By',
            placeholder: 'Processed By',
            disabled: true
          },
        },
        {
          className: 'flex-1 break-word',
          type: 'calendar',
          key: 'processedDate',
          templateOptions: {
            label: 'Processed Date',
            disabled: true
          },
        },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1 break-word',
          key: 'approver1',
          type: 'input',
          templateOptions: {
            label: 'Approver 1',
            disabled: true
          }
        },
        {
          className: 'flex-1 break-word',
          key: 'approver1DecisionDate',
          type: 'calendar',
          templateOptions: {
            label: 'Approver 1 Decision Date',
            disabled: true
          }
        },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1 break-word',
          key: 'approver2',
          type: 'input',
          templateOptions: {
            label: 'Approver 2',
            disabled: true
          }
        },
        {
          className: 'flex-1 break-word',
          key: 'approver2DecisionDate',
          type: 'calendar',
          templateOptions: {
            label: 'Approver 2 Decision Date',
            disabled: true
          }
        },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1 break-word',
          key: 'approver3',
          type: 'input',
          templateOptions: {
            label: 'Approver 3',
            disabled: true
          }
        },
        {
          className: 'flex-1 break-word',
          key: 'approver3DecisionDate',
          type: 'calendar',
          templateOptions: {
            label: 'Approver 3 Decision Date',
            disabled: true
          }
        },
      ]
    },
  ]

  constructor(private _http: HttpClient) { }

  GetById(id): Observable<any> { 
    return this._http.get(ApiConstants.awrMaefFormApi + '/getById/' + id);
  }

  GetFormlyFields() {
    return this.fields;
  }

  getMaefId(id): Observable<any> { 
    return this._http.get(ApiConstants.awrMaefFormApi + '/getMaefId/' + id);
  }

  update(id,awrMaef): Observable<any> { 
    return this._http.post(ApiConstants.awrMaefFormApi + '/update/' + id, awrMaef);
  }

  create(awrMaef): Observable<any> {
    return this._http.post(ApiConstants.awrMaefFormApi + '/create', awrMaef);
  }

  getAwrMaefData(id): Observable<any> {
    return this._http.post(ApiConstants.awrMaefFormApi + '/getAwrMaefFormData/' + id, {})
  }

  deleteAwrMaef(id,awrMaef): Observable<any> { 
    return this._http.delete(ApiConstants.awrMaefFormApi + '/deleteAwrMaef/' + id, awrMaef);
  }

  removeAppExAwrDetails(id): Observable<any> { 
    return this._http.delete(ApiConstants.awrMaefFormApi + '/removeAppExAwrDetails/' + id, {})
  }

  validateIfHasAwrMaef(id): Observable<any> {
    return this._http.get(ApiConstants.awrMaefFormApi + '/validate/' + id);
  }
}
