import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private auth: AuthService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.auth.user.pipe(
            take(1),
            map(user => user && user.roles.admin),
            tap(isAdmin => {
                if (!isAdmin) {
                    //show error massage
                    console.log("You Not Authorized");
                }
            })
        )
    }

}
