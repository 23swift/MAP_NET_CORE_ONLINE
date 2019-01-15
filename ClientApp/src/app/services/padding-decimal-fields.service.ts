import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaddingDecimalFieldsService {
  constructor() { }

  modifyDecimalFields(field) {
    if (field) {
      if (field.toString().match(/^\d+\.\d+$/)) {
        const decimalArr = field.toString().split('.');
        if (decimalArr[1].length !== 2) {
          decimalArr[1] = decimalArr[1] + '0';
        }

        return decimalArr[0] + '.' + decimalArr[1];
      } else {
        return field + '.00';
      }
    } else {
      return field === 0 ? '0.00' : null;
    }
  }
}
