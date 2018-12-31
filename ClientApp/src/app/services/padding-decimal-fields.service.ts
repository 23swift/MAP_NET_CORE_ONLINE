import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaddingDecimalFieldsService {
  constructor() { }

  modifyDecimalFields(model) {
    Object.getOwnPropertyNames(model).forEach(p => {
      if (model[p] !== null) {
        if (model[p].toString().match(/^\d+\.\d+$/)) {
          const decimalArr = model[p].toString().split('.');
          if (decimalArr[1].length !== 2) {
            decimalArr[1] = decimalArr[1] + '0';
          }

          model[p] = decimalArr[0] + '.' + decimalArr[1];
        }
      }
    });
  }
}
