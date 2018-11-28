import { Injectable } from '@angular/core';
import { DocumentListService } from 'src/app/services/document-list.service';

@Injectable()
export class DocumentChecklistFormModalService {

  constructor(private _documentListService: DocumentListService) { }

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
              options: this._documentListService.get(),
              labelProp: 'description',
              valueProp: 'id'
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
