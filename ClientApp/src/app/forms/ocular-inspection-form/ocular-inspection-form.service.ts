import { Injectable } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';

@Injectable({
    providedIn: 'root'
})
export class OcularInspectionFormService {
    fields: FormlyFieldConfig[] = [
        {
            key: 'DBATradeName',
            type: 'input',
            className: 'flex-1',
            templateOptions: {
                label: 'DBA (Branch / Trade Name)'
            },
            expressionProperties: {
            }
        },
        {
            template: '<span class="mat-subheading-1"> DBA (Branch / Outlet Address) </span>'
        },
        {
            fieldGroupClassName: 'display-flex',
            fieldGroup: [
                {
                    key: 'DBAoutletAddress1',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        placeholder: 'Address 1'
                    }

                }
            ]
        },
        {
            fieldGroupClassName: 'display-flex',
            fieldGroup: [
                {
                    key: 'DBAoutletAddress2',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        placeholder: 'Address 2'
                    }
                }
            ]
        },
        {
            fieldGroupClassName: 'display-flex',
            fieldGroup: [
                {
                    key: 'DBAoutletAddress3',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        placeholder: 'Address 3'
                    }
                }
            ]
        },

        {
            fieldGroupClassName: 'display-flex',
            fieldGroup: [
                {
                    key: 'DBAoutletAddress4',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        placeholder: 'Address 4'
                    }

                },
            ]
        },
        {
            fieldGroupClassName: 'display-flex',
            fieldGroup: [
                {
                    key: 'DBACity',
                    type: 'select',
                    className: 'flex-1',
                    templateOptions: {
                        placeholder: 'DBA City'
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
                    // templateOptions: {
                    //     label: 'Outskirt',
                    //     options: [
                    //         { value: 'true', label: 'Yes' },
                    //         { value: 'false', label: 'No' },
                    //     ]
                    // }
                },
                {
                    key: 'contactPerson',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Admin Contact person'
                    }
                },
                {
                    key: 'position',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Position'
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
                    }
                },
                {
                    key: 'mobileNo',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Mobile Number'
                    }
                },
                {
                    key: 'natureOfBusiness',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Nature of Business'
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
                    }
                },
                {
                    key: 'businessHours',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Business Hours'
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
                    }
                },
                {
                    key: 'monthlyRent',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Monthly Rent (If Rented / Leased)'
                    }
                },
                {
                    key: 'lengthOfStay',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Length of Stay at the Address Above'
                    }
                },
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
                    defaultValue: 0
                },
                {
                    key: 'businessSignage',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Business Signage'
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
                    defaultValue: 0
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
                    }
                },
                {
                    className: 'flex-1',
                    key: 'interiorAppearance',
                    type: 'radio',
                    defaultValue: 'Good',
                    templateOptions: {
                        label: 'Interior Appearance',
                        options: [
                            { value: 'Good', label: 'Good' },
                            { value: 'Poor', label: 'Poor' }
                        ]
                    }
                },
                {
                    className: 'flex-1',
                    key: 'exteriorAppearance',
                    type: 'radio',
                    defaultValue: 'Good',
                    templateOptions: {
                        label: 'Exterior Appearance',
                        options: [
                            { value: 'Good', label: 'Good' },
                            { value: 'Poor', label: 'Poor' }
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
                    key: 'stocksInventory',
                    type: 'radio',
                    defaultValue: 'Good',
                    templateOptions: {
                        label: 'Stocks / Inventory',
                        options: [
                            { value: 'Good', label: 'Good' },
                            { value: 'Poor', label: 'Poor' }
                        ]
                    }
                },
                {
                    className: 'flex-1',
                    key: 'equipment',
                    type: 'radio',
                    defaultValue: 'Good',
                    templateOptions: {
                        label: 'Equipment',
                        options: [
                            { value: 'Good', label: 'Good' },
                            { value: 'Poor', label: 'Poor' }
                        ]
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
                    }
                },
                {
                    key: 'venue',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Venue'
                    }
                },
                {
                    key: 'typeOfEvent',
                    type: 'select',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Type Of Event',
                        labelProp: 'Description',
                        valueProp: 'TypeOfEvent_Id',
                        options: []
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
                    }
                },
                {
                    key: 'productsServicesSoldOffered',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Products/Services Sold/Offered'
                    }
                },
                {
                    key: 'priceRangeOfProductsServices',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Price Range of Products/Services'
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
                    }
                },
                {
                    key: 'inclusiveDateOfEvent',
                    type: 'calendar',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Inclusive Date of Event'
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
                    }
                },
                {
                    key: 'venueOfTheLastEvent',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Venue of the Last Event'
                    }
                },
                {
                    key: 'dateOfTheLastEvent',
                    type: 'calendar',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Date of Last Event'
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
                    }
                },
                {
                    key: 'nameOfTheLastAcquirer',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Name of the Last Acquirer'
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
                    }
                },
                {
                    key: 'adverseFindings',
                    type: 'radio',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Adverse Findings',
                        options: [
                            { value: 'MISREPRESENTATION', label: 'MISREPRESENTATION' },
                            { value: 'OTHERS', label: 'OTHERS' }
                        ]
                    }
                },
                {
                    key: 'incompleteReportDueTo',
                    type: 'radio',
                    className: 'flex-1',
                    templateOptions: {
                        label: 'Incomplete Report Due To',
                        options: [
                            { value: 'NORELIABLEINFORMANT', label: 'NO RELIABLE INFORMANT' },
                            { value: 'INFORMANTREFUSEDTOPROVIDE', label: 'INFORMANT REFUSED TO PROVIDE' },
                            { value: 'OTHERS', label: 'OTHERS' }
                        ]
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
                    }
                },
                {
                    key: 'informantsName',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Informants Name'
                    }
                },
                {
                    key: 'informantsPosition',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Informants Position'
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
                    }
                },
                {
                    key: 'dateInspected',
                    type: 'calendar',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Date Inspected'
                    }
                },
                {
                    key: 'reviewedBy',
                    type: 'input',
                    className: 'flex-1',
                    templateOptions: {
                        required: true,
                        label: 'Reviewed By'
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
                    }
                }
            ]
        }
    ];

    constructor(private _http: HttpClient) { }

    getOIFFields(): FormlyFieldConfig[] {
        return this.fields;
    }

    get(id): Observable<any> {
        if (id) {
            return this._http.get(ApiConstants.oifApi + '/' + id);
        } else {
            return this._http.get(ApiConstants.oifApi);
        }
    }

    create(oif): Observable<any> {
        return this._http.post(ApiConstants.oifApi, oif);
    }

    update(id, oif): Observable<any> {
        return this._http.put(ApiConstants.oifApi + '/' + id, oif);
    }
}
