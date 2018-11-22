import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentPerRequestModalService {

  constructor(private _http: HttpClient) { }

  addToRequest(id, documentId): Observable<any> {
    return this._http.put(ApiConstants.documentChecklistApi + '/' + id + '/' + documentId, {});
  }

  getDocumentList(): Object[] {
    return [{ id: 1, description: 'BDO\'s Merchant Information Sheet (MIS)'},
    { id: 2, description: 'BDO\'s Ocular Inspection Form'},
    { id: 3, description: 'BDO\'s Merchant Accreditation Evaluation Form'},
    { id: 4, description: 'Certificate of Business Registration with BIR (Form 2303)'},
    { id: 5, description: 'Article of Partnership with SEC Filing Certificate'},
    { id: 6, description: 'Certificate of Membership with Any Travel Association'},
    { id: 7, description: 'Audited Financial Statement or Latest 6mos. Bank Statements'}
    ];
  }
}
