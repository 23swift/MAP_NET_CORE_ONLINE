import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';
import { HttpClient } from '@angular/common/http';

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
            label: 'Waive OIF'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dbaTradeName',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'DBA (Branch / Trade Name)'
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
      template: '<span class="mat-subheading-1"> DBA (Branch / Outlet Address) </span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'dbaOutletAddress1',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            placeholder: 'Address 1'
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
          key: 'dbaOutletAddress2',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            placeholder: 'Address 2'
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
          key: 'dbaOutletAddress3',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            placeholder: 'Address 3'
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
          key: 'dbaOutletAddress4',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            placeholder: 'Address 4'
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
          defaultValue: 0,
          templateOptions: {
            placeholder: 'DBA City'
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
          key: 'outskirt',
          type: 'radio',
          defaultValue: false,
          templateOptions: {
            label: 'Outskirt',
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' },
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'contactPerson',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Admin Contact person'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'position',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Position'
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
          key: 'phoneNo',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Branch / Outlet Phone Number'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'mobileNo',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Mobile Number'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'natureOfBusiness',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Nature of Business'
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
          key: 'productsOfferedSold',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Brand Names Or Products Offered/Sold'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'numberOfYearsOperating',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            pattern: '^\\d+$',
            pd: 'number',
            label: 'Number of Years Operating'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'businessHours',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Business Hours'
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
          key: 'noOfFulltimeEmployees',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            pattern: '^\\d+$',
            pd: 'number',
            label: 'No. of Fulltime Employees'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'contractual',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            pattern: '^\\d+$',
            pd: 'number',
            label: 'Contractual'
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
              { value: true, label: 'OWNED' },
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
            label: 'Monthly Rent (If Rented / Leased)'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'lengthOfStay',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Length of Stay at the Address Above'
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
          key: 'location',
          type: 'select',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Location',
            labelProp: 'Description',
            valueProp: 'Location_Id',
            options: [{ Description: 'Please provide', Location_Id: 0 }]
          },
          defaultValue: 0,
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'businessSignage',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Business Signage'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'typeOfPremise',
          type: 'select',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Type of Premise',
            labelProp: 'Description',
            valueProp: 'TypeOfPremise_Id',
            options: [{ Description: 'Please provide', TypeOfPremise_Id: 0 }]
          },
          defaultValue: 0,
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
          key: 'floorArea',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Floor Area in Sqm. (Please Specify)'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
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
          defaultValue: 'true',
          templateOptions: {
            label: 'With High Card Traffic?',
            options: [
              { value: 'true', label: 'Yes' },
              { value: 'false', label: 'No' }
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
            required: true,
            label: 'Surrounding Establishments Namely'
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
      template: '<span class="mat-headline mat-subheading-1">MOTO (Mandatory For MOTO Facility)</span>'
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'otherMarketingChannelSource',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Other Marketing / Channel Source'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'averageNoOfTransactionMonth',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            pattern: '^\\d+$',
            pd: 'number',
            label: 'Average No. of Transaction/Month'
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
            label: 'Name of Event'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'venue',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Venue'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'typeOfEvent',
          type: 'select',
          className: 'flex-1',
          defaultValue: 0,
          templateOptions: {
            label: 'Type Of Event',
            options: [
              {
                value: 0, label: 'Select Type of Event'
              }
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
            pd: 'number',
            label: 'Expected No. of Buyers'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'productsServicesSoldOffered',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Products/Services Sold/Offered'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'priceRangeOfProductsServices',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            label: 'Price Range of Products/Services'
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
            pd: 'number',
            label: 'Expected No. of Participants'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'averageRegistration',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            pattern: '^\\d+$',
            pd: 'number',
            label: 'Average Registration / Membership Fee'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
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
              return model['isWaved'];
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
            label: 'Name of Last Event'
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
            label: 'Venue of the Last Event'
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
            pd: 'number',
            label: 'Total Sales Volume of Last Event'
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
            label: 'Name of the Last Acquirer'
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
          defaultValue: 'true',
          templateOptions: {
            required: true,
            label: 'OverAll Rating',
            options: [
              { value: 'acceptable', label: 'ACCEPTABLE' },
              { value: 'notacceptable', label: 'NOT ACCEPTABLE' }
            ]
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'adverseFindings',
          type: 'radio',
          className: 'flex-1',
          defaultValue: false,
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
            }
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
            label: 'Remarks',
            description: ''
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'informantsName',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Informants Name'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'informantsPosition',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Informants Position'
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
          key: 'inspectedBy',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Inspected By'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'dateInspected',
          type: 'calendar',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Date Inspected'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        },
        {
          key: 'reviewedBy',
          type: 'input',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Reviewed By'
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
          key: 'dateReviewed',
          type: 'calendar',
          className: 'flex-1',
          templateOptions: {
            required: true,
            label: 'Date Reviewed'
          },
          expressionProperties: {
            'templateOptions.disabled': (model: any, formState: any) => {
              return model['isWaved'];
            }
          }
        }
      ]
    }
  ];

  constructor(private _http: HttpClient) { }

  getOIFFields(): FormlyFieldConfig[] {
    return this.fields;
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
}
