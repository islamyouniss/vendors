import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {AuthService} from "../../../services/auth.service";

import {faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../../models/User.model";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    faSignIn = faSignInAlt;
    faSignOut = faSignOutAlt;

    user_email: string | undefined;

    userSubscription: Subscription = new Subscription();
    isAuthenticated: boolean = false;

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
        this.userSubscription = this.auth.user.subscribe(user => {
            this.isAuthenticated = !!user;
            if (this.isAuthenticated) {
                this.user_email = user?.email;
            }
        });
    }

    logout() {
        if(this.isAuthenticated) {
            this.auth.logout();
        }
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }


}
