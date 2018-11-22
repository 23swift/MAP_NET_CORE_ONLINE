import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from '../api-constants';

export interface DocumentDisplayInfo {
  Id: number;
  Submitted: boolean;
  DocumentName: String;
  Remarks: String;
  TargetDateOfSubmission: String;
  FileUpload: String;
}

const TEST_DATA: DocumentDisplayInfo[] = [
  {
    Id: 1, Submitted: true, DocumentName: 'BDO\'s Merchant Information Sheet (MIS)',
    Remarks: 'Marked as submitted but no file is attached.', TargetDateOfSubmission: '08/29/2018', FileUpload: ''
  },
  {
    Id: 2, Submitted: true, DocumentName: 'BDO\'s Ocular Inspection Form (OIF)',
    Remarks: 'Marked as submitted but no file is attached.', TargetDateOfSubmission: '08/29/2018', FileUpload: ''
  }
];

@Injectable()
export class DocumentCheckListService {

  constructor(private _http: HttpClient) { }

  getTableFields() {
    return ['DocumentName', 'Submitted', 'Remarks', 'TargetDateOfSubmission', 'FileUpload', 'Action'];
  }

  getDocumentChecklist(): Object[] {
    return [{ id: 1, description: 'BDO\'s Merchant Information Sheet (MIS)' },
    { id: 2, description: 'BDO\'s Ocular Inspection Form' },
    { id: 3, description: 'BDO\'s Merchant Accreditation Evaluation Form' },
    { id: 4, description: 'Certificate of Business Registration with BIR (Form 2303)' },
    { id: 5, description: 'Article of Partnership with SEC Filing Certificate' },
    { id: 6, description: 'Certificate of Membership with Any Travel Association' },
    { id: 7, description: 'Audited Financial Statement or Latest 6mos. Bank Statements' }
    ];
  }

  get(id): Observable<any> {
    return this._http.get(ApiConstants.documentChecklistApi + '/' + id);
  }

  getFile(id): Observable<any> {
    return this._http.get(ApiConstants.documentChecklistApi + '/download/' + id);
  }

  getByNewAffiliation(id) {
    return this._http.get(ApiConstants.documentChecklistApi + '/newAffiliation/' + id);
  }

  update(id, document): Observable<any> {
    return this._http.put(ApiConstants.documentChecklistApi + '/' + id, document);
  }

  delete(id): Observable<any> {
    return this._http.delete(ApiConstants.documentChecklistApi + '/' + id);
  }

  base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      const ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  saveByteArray(byte, documentName) {
    const blob = new Blob([byte], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = documentName;
    link.download = fileName;
    link.click();
  }

  getDocumentName() {
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
