import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from 'src/app/api-constants';
import { Observable } from 'rxjs';

const apiUrl = '';
@Injectable()
export class HistoryModalService {

  constructor(private _http: HttpClient) { }

  getByRequest(id): Observable<any> {
    return this._http.get(ApiConstants.historyApi + '/request/' + id);
  }

  getDetailedByRequest(id): Observable<any> {
    return this._http.get(ApiConstants.historyApi + '/detailedByRequest/' + id);
  }
}
