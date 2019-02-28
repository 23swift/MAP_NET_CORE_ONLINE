import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';

@Injectable()
export class MdmUserService {

  constructor(private _http: HttpClient) { }
  
  getHeader(id): Observable<any> {
    return this._http.get(ApiConstants.mdmHeaderApi + '/' + id);
  }
}
