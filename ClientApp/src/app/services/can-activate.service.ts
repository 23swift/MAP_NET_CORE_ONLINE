import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CanActivateService implements CanActivate {
    routeArray = ['ao'];
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if (this.getAccess('mdcsEncoder')) {
            return true;
        } else {
            this.router.navigateByUrl('/error-page');
        }
    }

    getAccess(userGroup) {
        return this.routeArray.indexOf(userGroup) >= 0;
    }
}