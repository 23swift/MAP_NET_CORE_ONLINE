import { Injectable } from '@angular/core';
//import { AoListData } from "../../temp/aoListData/ao-list-data";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConstants } from 'src/app/api-constants';


@Injectable()
export class AoListModalService {
  private _baseUrl: string;


  constructor(private http: HttpClient) {
    // this._baseUrl = baseUrl
  }


  getAoList(): Observable<any> {
    return this.http.get(ApiConstants.aoListModalApi);
  }

  getByUserName(userName) {
    return this.http.get(ApiConstants.aoListModalApi + '/GetByUserName/' + userName);
  }

  setOwnerofRequest(Id,userId) {
    return this.http.put(ApiConstants.aoListModalApi + '/OwnRequest/' + Id + '/' + userId,{});
  }

  updateAssignRequest(data) {

  }

}
