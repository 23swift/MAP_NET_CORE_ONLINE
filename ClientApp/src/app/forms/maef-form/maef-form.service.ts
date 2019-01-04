import { Injectable } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../../api-constants';

@Injectable({
  providedIn: 'root'
})
export class  MaefFormService {
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [{
        className: 'flex-1',
        type: 'alertmessage',
        key: 'errField',
        hideExpression: "model['errField'] == undefined",
        templateOptions: {
          label: ''
        }

      }
      ]
    },
    /*
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [{
        className: 'flex-1',
        type: 'input',
        key: 'businessName',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Business / Legal Name',
          placeholder: 'Business / Legal Name'
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'dbaName',
        expressionProperties: {

        },
        templateOptions: {
          label: 'DBA Name(DBA/Trade Name)',
          placeholder: 'DBA Name(DBA/Trade Name)'
        }
      }
      ]
    }, */

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'alertmessage',
          key: 'alertmsg',
          templateOptions: {
            label: 'label',
            hidden: true
          },
          hideExpression: (model: any, formState: any) => {
            return !model['withSimulInstall'];
          }
        },

      ]
    },

    
    {
      template: '<span class="mat-headline">Credit Checking</span>',
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          key: 'bnpNfisWithAd',
          type: 'radio',
          templateOptions: {
            label: 'BNP NFIS',
            required: true,
            options: [
              { value: true, label: 'With Adverse' },
              { value: false, label: 'No Adverse' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'textarea',
          key: 'bnpNfisWithAdRemarks',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {

              return model['bnpNfisWithAd'];
            },
          },
          templateOptions: {
            label: 'Remarks',
            placeholder: 'Remarks',
            maxLength: 500,
          }
        }

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          key: 'nldsWithAd',
          type: 'radio',
          templateOptions: {
            label: 'NLDS',
            required: true,
            options: [
              { value: true, label: 'With Adverse' },
              { value: false, label: 'No Adverse' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'textarea',
          key: 'nldsWithAdRemarks',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {

              return model['nldsWithAd'];
            },
          },
          templateOptions: {
            label: 'Remarks',
            placeholder: 'Remarks',
            maxLength: 500,
          }
        }

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          key: 'pepOfacWithAd',
          type: 'radio',
          templateOptions: {
            label: 'PEP/OFAC',
            required: true,
            options: [
              { value: true, label: 'With Adverse' },
              { value: false, label: 'No Adverse' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'textarea',
          key: 'pepOfacWithAdRemarks',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {

              return model['pepOfacWithAd'];
            },
          },
          templateOptions: {
            label: 'Remarks',
            placeholder: 'Remarks',
            maxLength: 500,
          }
        }

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          key: 'matchWithAd',
          type: 'radio',
          templateOptions: {
            label: 'Match',
            required: true,
            options: [
              { value: true, label: 'With Adverse' },
              { value: false, label: 'No Adverse' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'textarea',
          key: 'matchWithAdRemarks',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {

              return model['matchWithAd'];
            },
          },
          templateOptions: {
            label: 'Remarks',
            placeholder: 'Remarks',
            maxLength: 500,
          }
        }

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          key: 'vmtsWithAd',
          type: 'radio',
          templateOptions: {
            label: 'VMTS',
            required: true,
            options: [
              { value: true, label: 'With Adverse' },
              { value: false, label: 'No Adverse' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'textarea',
          key: 'vmtsWithAdRemarks',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {

              return model['vmtsWithAd'];
            },
          },
          templateOptions: {
            label: 'Remarks',
            placeholder: 'Remarks',
            maxLength: 500,
          }
        }

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          key: 'tmrsWithAd',
          type: 'radio',
          templateOptions: {
            label: 'TMRS',
            required: true,
            options: [
              { value: true, label: 'With Adverse' },
              { value: false, label: 'No Adverse' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'textarea',
          key: 'tmrsWithAdRemarks',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {

              return model['tmrsWithAd'];
            },
          },
          templateOptions: {
            label: 'Remarks',
            placeholder: 'Remarks',
            maxLength: 500
          }
        }

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          key: 'fraudWithAd',
          type: 'radio',
          templateOptions: {
            label: 'FRAUD',
            required: true,
            options: [
              { value: true, label: 'With Adverse' },
              { value: false, label: 'No Adverse' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'textarea',
          key: 'fraudWithAdRemarks',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {

              return model['fraudWithAd'];
            },
          },
          templateOptions: {
            label: 'Remarks',
            placeholder: 'Remarks',
            maxLength: 500
          }
        }

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          key: 'prevDeclinedWithAd',
          type: 'radio',
          templateOptions: {
            label: 'Previously Declined/Watchlisted',
            required: true,
            options: [
              { value: true, label: 'With Adverse' },
              { value: false, label: 'No Adverse' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'textarea',
          key: 'prevDeclinedWithAdRemarks',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {

              return model['prevDeclinedWithAd'];
            },
          },
          templateOptions: {
            label: 'Remarks',
            placeholder: 'Remarks',
            maxLength: 500
          }
        }

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          className: 'flex-1',
          key: 'amlaYes',
          type: 'radio',
          templateOptions: {
            label: 'AMLA',
            required: true,
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ],
          },

        },

        { //*^
          key: 'amlaClass',
          className: 'flex-1',
          type: 'radio',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {
              return model['amlaYes'];
            }
          },
          templateOptions: {
            label: 'If Yes, Please Select Classification:',
            options: [
              { value: 'High Risk Business', label: 'High Risk Business' },
              { value: 'PEP', label: 'PEP' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'input',
          key: 'nameOfPep',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {
              return model['amlaClass'] == 'PEP';
            }
          },
          templateOptions: {
            label: 'Specify Name/ Relationship Of PEP:',
            placeholder: 'Specify Name/ Relationship Of PEP:'
          }
        },

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          className: 'flex-1',
          key: 'rptYes',
          type: 'radio',
          templateOptions: {
            label: 'RPT',
            required: true,
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ],
          },

        },

        {
          className: 'flex-1',
          key: 'rptClass',
          type: 'radio',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {
              return model['rptYes'];
            }
          },
          templateOptions: {
            label: 'If Yes, Please Select Classification:',
            options: [
              { value: 'Subsidiary', label: 'Subsidiary' },
              { value: 'Affiliates', label: 'Affiliates' },
              { value: 'DOSRI', label: 'DOSRI' },
              { value: 'Other RP', label: 'Other RP' }
            ],
          },

        },

        {
          className: 'flex-1',
          type: 'input',
          key: 'nameOfRp',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {
              return model['rptClass'] == 'Other RP';
            }
          },
          templateOptions: {
            label: 'Specify Name/ Relationship Of RP:',
            placeholder: 'Specify Name/ Relationship Of RP:'
          }
        },

      ]
    },

    {
      template: '<span class="mat-headline">Terms Of Acceptance</span>',
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'location',
          type: 'radio',
          templateOptions: {
            label: 'Location',
            required: true,
            options: [
              { value: 'Outskirt', label: 'Outskirt' },
              { value: 'Non-Outskirt', label: 'Non-Outskirt' },
              { value: 'Out Of Coverage', label: 'Out Of Coverage' }
            ],
          },
        },
        {
          className: 'flex-1',
          key: 'appearance',
          type: 'radio',
          templateOptions: {
            label: 'Appearance',
            required: true,
            options: [
              { value: true, label: 'Acceptable' },
              { value: false, label: 'Non-Acceptable' }
            ],
          },
        },
        {
          className: 'flex-1',
          key: 'withTelYes',
          type: 'radio',
          templateOptions: {
            label: 'With Telephone Landline',
            required: true,
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ],
          },

        },

      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

        {
          className: 'flex-1',
          key: 'largeAccYes',
          type: 'radio',
          templateOptions: {
            label: 'Large Account',
            required: true,
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ],
          },

        },

        {
          className: 'flex-1',
          key: 'natureBus',
          type: 'radio',
          templateOptions: {
            label: 'Nature Of Business',
            required: true,
            options: [
              { value: true, label: 'Desirable' },
              { value: false, label: 'Non-Desirable' }
            ],
          },

        },
        {
          className: 'flex-1',
          type: 'input',
          key: 'psv',
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {
              return model['largeAccYes'] == false;
            }
          },
          templateOptions: {
            label: 'PSV',
            placeholder: 'PSV'
          }
        },

      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-2',
          key: 'signVerifYes',
          type: 'radio',
          templateOptions: {
            label: 'Signature Verification?',
            required: true,
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ],
          },
        }
      ]
    },
    {
      template: '<span class="mat-headline">Decision</span>',
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [

       {
          className: 'flex-1',
          type: 'checkbox',
          key: 'chkApprove',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['chkDecline'];
          }, 
          },
          templateOptions: {
            label: 'Approve'
          },
          lifecycle: {
            onInit: (form, field) => {
              field.formControl.valueChanges.subscribe(v => {
                if (v === true) {
                  form.get('chkApprovePendingCust').patchValue(false);
                  form.get('chkWithReq').patchValue(false);
                  form.get('chkWithException').patchValue(false);
                  form.get('chkDecline').patchValue(false);
                } 
              });
            }
          },
        }, 
        {
          className: 'flex-1',
          type: 'checkbox',
          key: 'chkApprovePendingCust',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['chkApprove'] || model['chkDecline'];
          },
        },
          templateOptions: {
            label: 'Approve With Pending Customer Number'            
            },
        }, 
        {
          className: 'flex-1',
          type: 'checkbox',
          key: 'chkWithReq',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['chkApprove'] || model['chkDecline']) || model['id'] === 0;
          },
        },
          templateOptions: {
            label: 'Approve With Requirement Reason'
          },
        },
      ]
    },

            // *Approve with Requirement Reason
    {
      type: 'approveWithReq',
      hideExpression: "model['chkWithReq'] == undefined || model['chkWithReq'] == false "
    },  
            // approve-with-req-reason
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
        {
          className: 'flex-1',
          type: 'checkbox',
          key: 'chkWithException',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return (model['chkApprove'] || model['chkDecline']) || model['id'] === 0;
          },
        },
          templateOptions: {
            label: 'Approve With Exception Reason'
          },
        },
        {
          className: 'flex-1',
          type: 'checkbox',
          key: 'chkDecline',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['chkApprove'];
          },
        },
          templateOptions: {
            label: 'Decline'
          },
          lifecycle: {
            onInit: (form, field) => {
              field.formControl.valueChanges.subscribe(v => {
                if (v === true) {
                  form.get('chkApprovePendingCust').patchValue(false);
                  form.get('chkWithReq').patchValue(false);
                  form.get('chkWithException').patchValue(false);
                  form.get('chkApprove').patchValue(false);
                } 
              });
            }
          },
        },
      ]
    },
        // *Approve with Exception Details
    {
       type: 'approveWithExcept',
       hideExpression: "model['chkWithException'] == undefined || model['chkWithException'] == false "
    },
        //

 /*       {
          className: 'flex-1 mat-form-field-infix',
          type: 'checkDialog',
          key: 'chkDecline',
          templateOptions: {
            label: 'Decline'
          },
        },*/
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
        className: 'flex-1',
        type: 'input',
        key: 'assignMidCap',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Assigned MID Cap',
          placeholder: 'Assigned MID Cap',
          maxLength: 13
        },
      },
    ]
  },
  {
    fieldGroupClassName: 'display-flex',
    fieldGroup: [
      {
        className: 'flex-1',
        type: 'input',
        key: 'payDelay',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Pay Delay Days',
          placeholder: 'Pay Delay Days',
          maxLength: 13
        }
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'holdOutDeposit',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Holdout Deposit',
          placeholder: 'Holdout Deposit',
          maxLength: 19
        },
        validators: {
          validation: ['numeric'],
        }
      },
      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [{
        className: 'flex-1',
        type: 'textarea',
        key: 'otherRemarks',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Other Remarks',
          placeholder: 'Other Remarks',
          maxLength: 2000,
          required: true
        },
      },
      {
        className: 'flex-1',
        type: 'input',
        key: 'processedBy',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Processed By',
          placeholder: 'Processed By',
          required: true
        }
      },
      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [{
        className: 'flex-1',
        type: 'input',
        key: 'approver1',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Approver 1',
          disabled: true
        },
      },
      {
        className: 'flex-1',
        type: 'calendar',
        key: 'decisionDate1',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Approver 1 Decision Date',
          disabled: true
        }
      },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [{
        className: 'flex-1',
        type: 'input',
        key: 'approver2',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Approver 2',
          disabled: true
        },
      },
      {
        className: 'flex-1',
        type: 'calendar',
        key: 'decisionDate2',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Approver 2 Decision Date',
          disabled: true
        }
      },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [{
        className: 'flex-1',
        type: 'input',
        key: 'approver3',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Approver 3',
          disabled: true
        },
      },
      {
        className: 'flex-1',
        type: 'calendar',
        key: 'decisionDate3',
        expressionProperties: {

        },
        templateOptions: {
          label: 'Approver 3 Decision Date',
          disabled: true
        }
      },
      ]
    },



  ];

  constructor(private _http: HttpClient) { }
  getMaefFields(): FormlyFieldConfig[] {
    return this.fields;
  }

  create(maef): Observable<any> {
    return this._http.post(ApiConstants.maefApi, maef);
  }

  update(id, maef): Observable<any> {
    return this._http.put(ApiConstants.maefApi + '/' + id, maef);
  }

  getMAEF(id): Observable<any> {
    return this._http.get(ApiConstants.maefApi + '/' + id);
  }

  getRemarks(id, actionCode): Observable<any> {
    return this._http.get(ApiConstants.maefApi + '/history/' + id + '/' + actionCode);
  }

  checkRemarks(id, actionCode): Observable<any> {
    return this._http.get(ApiConstants.maefApi + '/historyCheck/' + id + '/' + actionCode);
  }

  ReturntoAO(id): Observable<any> {
    return this._http.put(ApiConstants.maefApi + '/returnToAo/' + id, {});
  }

  ReturntoMAMO(id): Observable<any> {
    return this._http.put(ApiConstants.maefApi + '/returnToMamo/' + id, {});
  }

  Decline(id): Observable<any> {
    return this._http.put(ApiConstants.maefApi + '/decline/' + id, {});
  }

  SubmitToApprover(id): Observable<any> {
    return this._http.put(ApiConstants.maefApi + '/submitToApprover/' + id, {});
  }

  Approve(id): Observable<any> {
    return this._http.put(ApiConstants.maefApi + '/approve/' + id, {});
  }  


}
