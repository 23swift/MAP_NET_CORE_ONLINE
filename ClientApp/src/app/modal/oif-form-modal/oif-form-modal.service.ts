import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';
import { DropDownService } from 'src/app/services/drop-down.service';
import { forEach } from '@angular/router/src/utils/collection';
import { FormlyFieldConfigService } from 'src/app/services/formly-field-config.service';

@Injectable()
export class OifFormModalService {
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'isWaved',
          type: 'checkbox',
          className: 'flex-1',
          templateOptions: {
            label: 'Waive OIF',
            indeterminate: false
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dbaName',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'DBA (Branch / Trade Name)',
            maxLength: 22
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      template: '<span class="mat-subheading-1"> DBA (Branch / Outlet Address) </span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dbaAddress1',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            placeholder: 'Address 1',
            maxLength: 30
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dbaAddress2',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            placeholder: 'Address 2',
            maxLength: 30
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dbaAddress3',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            placeholder: 'Address 3',
            maxLength: 30
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        }
      ]
    },

    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dbaAddress4',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            placeholder: 'Address 4',
            maxLength: 30
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dbaCity',
          type: 'select',
          className: 'flex-1',
          templateOptions: {
            label: 'DBA City',
            options: this._dropDownService.getDropdown('CY'),
            labelProp: 'value',
            valueProp: 'code',
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'outskirt',
          type: 'radioOutskirt',
          templateOptions: {
            label: 'Outskirt'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
          }
        },
        {
          key: 'adminContactPerson',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Admin Contact person',
            maxLength: 30
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'position',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Position',
            maxLength: 30
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'branchPhoneNumber',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Branch / Outlet Phone Number',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'branchMobileNumber',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Mobile Number',
            maxLength: 15
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'natureOfBusiness',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Nature of Business',
            maxLength: 50
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'productsOfferedSold',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Brand Names Or Products Offered/Sold',
            maxLength: 100
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'numberOfYearsOperating',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            pattern: '^\\d+$',
            type: 'number',
            label: 'Number of Years Operating',
            maxLength: 30
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'businessHours',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Business Hours',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'noOfFulltimeEmployees',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'No. of Fulltime Employees',
            maxLength: 5
          },
          validators: {
            validation: ['numeric'],
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'contractual',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Contractual',
            maxLength: 5
          },
          validators: {
            validation: ['numeric'],
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<span class="mat-headline mat-subheading-1">Business Premise</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'premiseStatus',
          type: 'radio',
          templateOptions: {
            label: 'Premise Status',
            options: [
              { value: 'OWNED', label: 'OWNED' },
              { value: 'RENTED', label: 'RENTED / LEASED' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'monthlyRent',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Monthly Rent (If Rented / Leased)',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'] || model['premiseStatus'] === 'OWNED';
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'] && model['premiseStatus'] === 'RENTED';
            }
          }
        },
        {
          key: 'lengthOfStay',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Length of Stay at the Address Above',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'location',
          type: 'select',
          className: 'flex-1',
          templateOptions: {
            label: 'Location',
            options: this._dropDownService.getDropdown('LOC'),
            labelProp: 'value',
            valueProp: 'code',
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'businessSignage',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Business Signage',
            maxLength: 50
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'typeOfPremise',
          type: 'select',
          className: 'flex-1',
          templateOptions: {
            label: 'Type of Premise',
            options: this._dropDownService.getDropdown('TP'),
            labelProp: 'value',
            valueProp: 'code',
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'floorArea',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Floor Area in Sqm. (Please Specify)',
            maxLength: 10
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          className: 'flex-1',
          key: 'interiorAppearance',
          type: 'radio',
          defaultValue: true,
          templateOptions: {
            label: 'Interior Appearance',
            options: [
              { value: true, label: 'Good' },
              { value: false, label: 'Poor' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          className: 'flex-1',
          key: 'exteriorAppearance',
          type: 'radio',
          defaultValue: true,
          templateOptions: {
            label: 'Exterior Appearance',
            options: [
              { value: true, label: 'Good' },
              { value: false, label: 'Poor' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          key: 'stocksInventory',
          type: 'radio',
          defaultValue: true,
          templateOptions: {
            label: 'Stocks / Inventory',
            options: [
              { value: true, label: 'Good' },
              { value: false, label: 'Poor' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          className: 'flex-1',
          key: 'equipment',
          type: 'radio',
          defaultValue: true,
          templateOptions: {
            label: 'Equipment',
            options: [
              { value: true, label: 'Good' },
              { value: false, label: 'Poor' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          className: 'flex-1',
          key: 'withHighCardTraffic',
          type: 'radio',
          defaultValue: true,
          templateOptions: {
            label: 'With High Card Traffic?',
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<span class="mat-headline mat-subheading-1">Neighborhood</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'surroundingEstablishment',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Surrounding Establishments Namely',
            maxLength: 150
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<span class="mat-headline mat-subheading-1">MOTO (Mandatory For MOTO Facility)</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'otherMarketingChannelSource',
          type: 'input',
          className: 'flex-1',
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              let isDisabled = true;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/moto/i)) {
                    isDisabled = false;
                  }
                });
              }
              return model['isWaved'] || isDisabled;
            },
            'templateOptions.required': (model: any, formState: any) => {
              let isRequired = false;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/moto/i)) {
                    isRequired = true;
                  }
                });
              }
              return isRequired;
            }
          },
          templateOptions: {
            label: 'Other Marketing / Channel Source',
            maxLength: 30
          }
        },
        {
          key: 'averageNoOfTransactionMonth',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Average No. of Transaction/Month',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              let isDisabled = true;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/moto/i)) {
                    isDisabled = false;
                  }
                });
              }
              return model['isWaved'] || isDisabled;
            },
            'templateOptions.required': (model: any, formState: any) => {
              let isRequired = false;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/moto/i)) {
                    isRequired = true;
                  }
                });
              }
              return isRequired;
            }
          },
          validators: {
            validation: ['numeric']
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<span class="mat-headline mat-subheading-1">For Event Purposes Only (Mandatory for Event Facility)</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'nameOfEvent',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Name of Event',
            maxLength: 50
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              let isDisabled = true;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/event/i)) {
                    isDisabled = false;
                  }
                });
              }
              return model['isWaved'] || isDisabled;
            },
            'templateOptions.required': (model: any, formState: any) => {
              let isRequired = false;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/event/i)) {
                    isRequired = true;
                  }
                });
              }
              return isRequired;
            }
          }
        },
        {
          key: 'venue',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Venue',
            maxLength: 120
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              let isDisabled = true;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/event/i)) {
                    isDisabled = false;
                  }
                });
              }
              return model['isWaved'] || isDisabled;
            },
            'templateOptions.required': (model: any, formState: any) => {
              let isRequired = false;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/event/i)) {
                    isRequired = true;
                  }
                });
              }
              return isRequired;
            }
          }
        },
        {
          key: 'typeOfEvent',
          type: 'select',
          className: 'flex-1',
          templateOptions: {
            label: 'Type Of Event',
            options: this._dropDownService.getDropdown('TE'),
            labelProp: 'value',
            valueProp: 'code',
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              let isDisabled = true;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/event/i)) {
                    isDisabled = false;
                  }
                });
              }
              return model['isWaved'] || isDisabled;
            },
            'templateOptions.required': (model: any, formState: any) => {
              let isRequired = false;
              if (model.hasOwnProperty('monitorCodeList')) {
                model['monitorCodeList'].forEach(v => {
                  if (v.match(/event/i)) {
                    isRequired = true;
                  }
                });
              }
              return isRequired;
            }
          },
          lifecycle: {
            onInit: (form, field) => {
              field.formControl.valueChanges.subscribe(v => {
                if (v === 'EXHIBIT') {
                  form.get('expectedNoOfParticipants').patchValue(undefined);
                  form.get('averageRegistration').patchValue(undefined);
                  form.get('inclusiveDateOfEvent').patchValue(undefined);
                } else if (v === 'CONFERENCE/SYMPOSIUM/ANNUAL MEETING') {
                  form.get('expectedNoOfBuyers').patchValue(undefined);
                  form.get('productsServicesSoldOffered').patchValue(undefined);
                  form.get('priceRangeOfProductsServices').patchValue(undefined);
                } else {
                  form.get('expectedNoOfBuyers').patchValue(undefined);
                  form.get('productsServicesSoldOffered').patchValue(undefined);
                  form.get('priceRangeOfProductsServices').patchValue(undefined);
                  form.get('expectedNoOfParticipants').patchValue(undefined);
                  form.get('averageRegistration').patchValue(undefined);
                  form.get('inclusiveDateOfEvent').patchValue(undefined);
                }
              });
            }
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<span class="mat-headline mat-subheading-1">If Exhibit</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'expectedNoOfBuyers',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            pattern: '^\\d+$',
            type: 'number',
            label: 'Expected No. of Buyers',
            maxLength: 10
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'] || model['typeOfEvent'] !== 'EXHIBIT';
            }
          }
        },
        {
          key: 'productsServicesSoldOffered',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Products/Services Sold/Offered',
            maxLength: 100
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'] || model['typeOfEvent'] !== 'EXHIBIT';
            }
          }
        },
        {
          key: 'priceRangeOfProductsServices',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Price Range of Products/Services',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'] || model['typeOfEvent'] !== 'EXHIBIT';
            }
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<span class="mat-headline mat-subheading-1">If Conference Or Like</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'expectedNoOfParticipants',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            pattern: '^\\d+$',
            type: 'number',
            label: 'Expected No. of Participants',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'] || model['typeOfEvent'] !== 'CONFERENCE/SYMPOSIUM/ANNUAL MEETING';
            }
          }
        },
        {
          key: 'averageRegistration',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            pattern: '^\\d+$',
            type: 'number',
            label: 'Average Registration / Membership Fee',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'] || model['typeOfEvent'] !== 'CONFERENCE/SYMPOSIUM/ANNUAL MEETING';
            }
          }
        },
        {
          key: 'inclusiveDateOfEvent',
          type: 'calendar',
          className: 'flex-1',
          templateOptions: {
            label: 'Inclusive Date of Event'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'] || model['typeOfEvent'] !== 'CONFERENCE/SYMPOSIUM/ANNUAL MEETING';
            }
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<span class="mat-headline mat-subheading-1">Information on Last Event Held (Mandatory For Event Facility)</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'nameOfLastEvent',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Name of Last Event',
            maxLength: 50
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'venueOfTheLastEvent',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Venue of the Last Event',
            maxLength: 120
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'dateOfTheLastEvent',
          type: 'calendar',
          className: 'flex-1',
          templateOptions: {
            label: 'Date of Last Event'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'totalSalesVolume',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            pattern: '^\\d+$',
            type: 'number',
            label: 'Total Sales Volume of Last Event',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'nameOfTheLastAcquirer',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Name of the Last Acquirer',
            maxLength: 20
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<span class="mat-headline mat-subheading-1">Overall Findings</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {

          key: 'overAllRating',
          type: 'radio',
          className: 'flex-1',
          templateOptions: {
            label: 'OverAll Rating',
            options: [
              { value: true, label: 'ACCEPTABLE' },
              { value: false, label: 'NOT ACCEPTABLE' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'adverseFindings',
          type: 'radio',
          className: 'flex-1',
          // defaultValue: false,
          templateOptions: {
            label: 'Adverse Findings',
            options: [
              { value: true, label: 'MISREPRESENTATION' },
              { value: false, label: 'OTHERS' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'] && model['overAllRating'] === false;
            },
          }
        },
        {
          key: 'incompleteReportDueTo',
          type: 'radio',
          className: 'flex-1',
          defaultValue: 0,
          templateOptions: {
            label: 'Incomplete Report Due To',
            options: [
              { value: 1, label: 'NO RELIABLE INFORMANT' },
              { value: 2, label: 'INFORMANT REFUSED TO PROVIDE' },
              { value: 3, label: 'OTHERS' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'remarks',
          type: 'textarea',
          className: 'flex-1',
          templateOptions: {
            label: 'Remarks'
          },
          expressionProperties: {
            'templateOptions.required': (model: any, formState: any) => {
              return model['isWaved'] || model['adverseFindings'] === false || model['incompleteReportDueTo'] === 3;
            }
          }
        },
        {
          key: 'informantsName',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Informants Name',
            maxLength: 50
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'informantsPosition',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Informants Position',
            maxLength: 30
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'inspectedBy',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Inspected By',
            maxLength: 50
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'dateInspected',
          type: 'calendar',
          className: 'flex-1',
          templateOptions: {
            label: 'Date Inspected'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        },
        {
          key: 'reviewedBy',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Reviewed By',
            maxLength: 50
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dateReviewed',
          type: 'calendar',
          className: 'flex-1',
          templateOptions: {
            label: 'Date Reviewed'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            },
            'templateOptions.required': (model: any, formState: any) => {
              return !model['isWaved'];
            }
          }
        }
      ]
    }
  ];

  constructor(private _http: HttpClient, private _dropDownService: DropDownService, private _formlyConfig: FormlyFieldConfigService) { }

  getOIFFields(userGroup): FormlyFieldConfig[] {
    if (userGroup === 'mdmUser') {
      this._formlyConfig.disabled(this.fields);
      return this.fields;
    } else {
      return this.fields;
    }

  }

  getByBranch(id): Observable<any> {
    return this._http.get(ApiConstants.oifApi + '/branch/' + id);
  }

  create(oif): Observable<any> {
    return this._http.post(ApiConstants.oifApi, oif);
  }

  update(id, oif): Observable<any> {
    return this._http.put(ApiConstants.oifApi + '/' + id, oif);
  }

  getOifAutoPopulate(id): Observable<any> {
    return this._http.get(ApiConstants.oifApi + '/oifAutoPopulate/' + id);
  }

  validateByNewAffiliationId(id): Observable<any> {
    return this._http.get(ApiConstants.oifApi + '/validate/' + id);
  }
}
