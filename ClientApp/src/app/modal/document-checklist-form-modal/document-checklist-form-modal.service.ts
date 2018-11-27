import { Injectable } from '@angular/core';

@Injectable()
export class DocumentChecklistFormModalService {

  constructor() { }

  getFormlyFields() {
    return [
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'documentName',
            type: 'select',
            templateOptions: {
              label: 'Document Name',
              disabled: true,
              options: [
                { value: 1, label: 'BDO\'s Merchant Information Sheet (MIS)' },
                { value: 2, label: 'BDO\'s Ocular Inspection Form' },
                { value: 3, label: 'BDO\'s Merchant Accreditation Evaluation Form' },
                { value: 4, label: 'Certificate of Business Registration with BIR (Form 2303)' },
                { value: 5, label: 'Article of Partnership with SEC Filing Certificate' },
                { value: 6, label: 'Certificate of Membership with Any Travel Association' },
                { value: 7, label: 'Audited Financial Statement or Latest 6mos. Bank Statements' }
              ]
            }
          }
        ]
      },
      {
        fieldGroupClassName: 'display-flex',
        fieldGroup: [
          {
            className: 'flex-1',
            key: 'submitted',
            type: 'checkbox',
            defaultValue: false,
            templateOptions: {
              label: 'Submitted',
            }
          },
          {
            className: 'flex-1',
            key: 'remarks',
            type: 'input',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return !model['submitted'];
              }
            },
            templateOptions: {
              label: 'Remarks',
            }
          },
          {
            className: 'flex-1',
            key: 'targetDateOfSubmission',
            type: 'calendar',
            expressionProperties: {
              'templateOptions.required': (model: any, formState: any) => {
                return !model['submitted'];
              }
            },
            templateOptions: {
              label: 'Target Date of Submission',
            }
          }
        ]
      }
      // ,
      // {
      //   fieldGroupClassName: 'display-flex',
      //   fieldGroup: [
      //     {
      //       className: 'flex-1',
      //       key: 'submitted',
      //       type: 'checkbox',
      //       defaultValue: false,
      //       templateOptions: {
      //         label: 'Submitted',
      //       }
      //     },
      //     {
      //       className: 'flex-1',
      //       key: 'targetDateOfSubmission',
      //       type: 'calendar',
      //       expressionProperties: {
      //         'templateOptions.required': (model: any, formState: any) => {
      //           return !model['submitted'];
      //         }
      //       },
      //       templateOptions: {
      //         label: 'Target Date of Submission',
      //       }
      //     }
      //     // ,
      //     // {
      //     //   className: 'flex-1',
      //     //   key: 'fileUpload',
      //     //   type: 'input',
      //     //   templateOptions: {
      //     //     type: 'file',
      //     //     label: 'Upload File',
      //     //   },
      //     //   lifecycle: {
      //     //     onInit: (form, field) => {
      //     //       field.formControl.valueChanges.subscribe(v => {
      //     //         const file: File = v.files[0];
      //     //         if (file) {
      //     //           const myReader: FileReader = new FileReader();

      //     //           myReader.onloadend = (e) => {
      //     //             const fileOnReader = myReader.result;

      //     //             const base64file = fileOnReader ? fileOnReader.toString().split(',')[1] : null;

      //     //             form.get('fileUpload').patchValue(base64file);
      //     //           };

      //     //           myReader.readAsDataURL(file);
      //     //         }
      //     //       });
      //     //     }
      //     //   }
      //     // }
      //   ]
      // }
    ];
  }
}
