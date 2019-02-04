import { Injectable } from '@angular/core';
import { DocumentListService } from 'src/app/services/document-list.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { DropDownService } from 'src/app/services/drop-down.service';

@Injectable()
export class DocumentChecklistFormModalService {

  constructor(private _documentListService: DocumentListService, private _http: HttpClient, private _dropDownService: DropDownService) { }

  getFormlyFields(userGroup = 'ao') {
    if (userGroup === 'ao') {
      return [
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'withTempoWaiver',
              type: 'checkbox',
              defaultValue: false,
              templateOptions: {
                label: 'With Tempo Waiver',
                indeterminate: false
              }
            },
            {
              className: 'flex-6',
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
              expressionProperties: {
                'templateOptions.disabled': (model: any, formState: any) => {
                  return model['withTempoWaiver'];
                }
              },
              templateOptions: {
                label: 'Submitted',
                indeterminate: false
              },
              lifecycle: {
                onInit: (form, field) => {
                  field.formControl.valueChanges.subscribe(v => {
                    if (v === false) {
                      form.get('dateSubmitted').patchValue(undefined);
                      form.get('targetDateOfSubmission').patchValue(undefined);
                    } else {
                      form.get('targetDateOfSubmission').patchValue(undefined);
                    }
                  });
                }
              }
            },
            {
              className: 'flex-3',
              key: 'targetDateOfSubmission',
              type: 'calendar',
              expressionProperties: {
                'templateOptions.required': (model: any, formState: any) => {
                  return !model['submitted'] && !model['withTempoWaiver'];
                },
                'templateOptions.disabled': (model: any, formState: any) => {
                  return model['submitted'] || model['withTempoWaiver'];
                }
              },
              templateOptions: {
                label: 'Target Date of Submission',
              }
            },
            {
              className: 'flex-3',
              key: 'dateSubmitted',
              type: 'calendar',
              expressionProperties: {

              },
              templateOptions: {
                label: 'Date Submitted',
                disabled: true
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'remarks',
              type: 'input',
              expressionProperties: {
                'templateOptions.required': (model: any, formState: any) => {
                  return !model['submitted'] && !model['withTempoWaiver'];
                }
              },
              templateOptions: {
                label: 'Remarks',
              }
            }
          ]
        }
      ];
    } else if (userGroup === 'mdm') {
      return [
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'withTempoWaiver',
              type: 'checkbox',
              defaultValue: false,
              templateOptions: {
                label: 'With Tempo Waiver',
                indeterminate: false
              }
            },
            {
              className: 'flex-6',
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
                indeterminate: false,
                disabled: true
              }
            },
            {
              className: 'flex-3',
              key: 'targetDateOfSubmission',
              type: 'calendar',
              templateOptions: {
                label: 'Target Date of Submission',
                disabled: true
              }
            },
            {
              className: 'flex-3',
              key: 'dateSubmitted',
              type: 'calendar',
              templateOptions: {
                label: 'Date Submitted',
                disabled: true
              }
            }
          ]
        },
        {
          fieldGroupClassName: 'display-flex',
          fieldGroup: [
            {
              className: 'flex-1',
              key: 'dmiIndex',
              type: 'input',
              templateOptions: {
                label: 'DMI Index',
                disabled: true
              }
            },
            {
              className: 'flex-1',
              key: 'classification',
              type: 'checkbox',
              templateOptions: {
                label: 'Major',
                indeterminate: false,
                disabled: true
              }
            },
            {
              className: 'flex-1',
              key: 'original',
              type: 'checkbox',
              templateOptions: {
                label: 'Original',
                indeterminate: false
              }
            },
            {
              className: 'flex-1',
              key: 'documentStatus',
              type: 'select',
              templateOptions: {
                label: 'Document Status',
                // options: this._dropDownService.getDropdown('DS')
                options: [
                  { value: 'LACKING', label: 'Lacking' },
                  { value: 'INCOMPLETE', label: 'Incomplete' },
                  { value: 'COMPLIED', label: 'Complied' },
                  { value: 'WAIVED', label: 'Waived' },
                  { value: 'NOT APPLICABLE', label: 'Not Applicable' }
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
              key: 'remarks',
              type: 'input',
              templateOptions: {
                label: 'Remarks',
              }
            }
          ]
        }
      ];
    }
  }

  deleteDocumentUploaded(id): Observable<any> {
    return this._http.put(ApiConstants.documentChecklistApi + '/document/' + id, {});
  }
}
