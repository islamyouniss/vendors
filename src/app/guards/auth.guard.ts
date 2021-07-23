import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {map, take, tap} from "rxjs/operators";
import {loggedIn} from "@angular/fire/auth-guard";
import {HotToastService} from "@ngneat/hot-toast";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router, private toast: HotToastService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.auth.user.pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigate(["/login"]).then(() => {
                        this.toast.warning("You Have To Login To View This Page!", {dismissible: true, position: 'top-right'});
                    })
                }
            })
        )
    }
}
