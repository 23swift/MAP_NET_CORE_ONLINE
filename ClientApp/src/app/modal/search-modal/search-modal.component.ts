import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '../../../../node_modules/@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';

interface ISearchField {
  mqr: string[];
  mdcsEncoder: string[];
}

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {
  searchCriteria: ISearchField;
  criteriaContainer: string[][];
  userGroup: string;
  constructor(private _matDialogRef: MatDialogRef<SearchModalComponent>,
    @Inject(MAT_DIALOG_DATA)public dialogData: any) {
      this.userGroup = this.dialogData['userGroup'];
    }

  ngOnInit() {
    this.searchCriteria = {
      mqr: ['RT Number', 'Request Type', 'DBA Name', 'Date Requested', 'Request Status', 'Account Officer', 'Aging'],
      mdcsEncoder: ['Business Name', 'DBA Name', 'AO Name']
    };
    this.criteriaContainer = new Array<Array<string>>();
    let rawArray = [];
    this.searchCriteria[this.userGroup].forEach((val, index, arr) => {
      if (index !== 0 && index % 2 === 0) {
        this.criteriaContainer.push(rawArray);
        rawArray = [];
      }

      rawArray.push(val);
      if (index === (arr.length - 1)) {
        this.criteriaContainer.push(rawArray);
      }
    });
  }
  closeDialog() {
    this._matDialogRef.close();
  }

}
