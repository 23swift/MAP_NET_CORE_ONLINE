import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ApiConstants } from "../api-constants";
import { BehaviorSubject, Observable } from "rxjs";
import { AoEncoderComponent } from "../new-affiliation/ao-encoder/ao-encoder.component";

export interface Claims {
    name: string;
    role: string[];
    access: string[];
    rank: string;
}
@Injectable({
    providedIn: 'root'
})
export class CanActivateService implements CanActivate {
    claims$ = new BehaviorSubject<Claims>(null);

    constructor(private _http: HttpClient, private _router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        let hasAccess = false;
        if (this.claims$.getValue() === null) {
            return this.accessGuard(this._http.get<Claims>(ApiConstants.corsApi + '/access'), true, state);
        } else {
            console.log(state);
            return this.accessGuard(this.claims$, false, state);
        }
    }

    accessGuard(obs: Observable<Claims>, saveClaims: boolean, state: RouterStateSnapshot) {
        console.log(saveClaims);
        let hasAccess = false;
        return obs.toPromise().then((c: Claims) => {
            if (saveClaims) {
                this.claims$.next(c);
            }

            if (state.url.indexOf('home') > -1) {
                hasAccess = true;
            } else {
                c.access.forEach(a => {
                    console.log(a);
                    if (state.url.indexOf(a) > -1) {
                        hasAccess = true;
                    }
                });
            }

            if (!hasAccess) {
                this._router.navigateByUrl('/no-access');
            }

            return hasAccess;
        }).catch(e => {
            console.log(e);
            this._router.navigateByUrl('/no-access');
            return hasAccess;
        });
    }

}
