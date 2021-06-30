import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanDeactivate,
    CanLoad,
    Route, Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.auth.user.pipe(
            take(1),
            map((user) => {
                const isAuth = !!user;
                if(isAuth) {
                    return true;
                }
                return this.router.createUrlTree(["/login"]);
            }));
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }

    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }
}
