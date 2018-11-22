import { Injectable } from '@angular/core';

@Injectable()
export class DocumentCheckListFormService {

  constructor() { }
  getDocumentList(): Object[] {
    return [{ Id: 1, Description: 'BDO\'s Merchant Information Sheet (MIS)'},
    { Id: 2, Description: 'BDO\'s Ocular Inspection Form'},
    { Id: 3, Description: 'BDO\'s Merchant Accreditation Evaluation Form'},
    { Id: 4, Description: 'Certificate of Business Registration with BIR (Form 2303)'},
    { Id: 5, Description: 'Article of Partnership with SEC Filing Certificate'},
    { Id: 6, Description: 'Certificate of Membership with Any Travel Association'},
    { Id: 7, Description: 'Audited Financial Statement or Latest 6mos. Bank Statements'}
    ];
  }
}
