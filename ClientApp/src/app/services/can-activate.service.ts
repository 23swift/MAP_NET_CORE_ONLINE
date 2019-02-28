import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ApiConstants } from "../api-constants";

@Injectable({
    providedIn: 'root'
})
export class CanActivateService implements CanActivate {
    routeArray = ['', ];
    claims: Object;
    constructor(private _http: HttpClient) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!this.claims) {
            return this._http.get(ApiConstants.corsApi + '/access').toPromise().then(v => {
                this.claims = v;

                return true;
            });
        } else {
            return true;
        }
    }
}
