import {Component, OnInit} from '@angular/core';

import {AuthService} from "../../../services/auth.service";

import {faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    faSignIn = faSignInAlt;
    faSignOut = faSignOutAlt;

    constructor(public auth: AuthService) { }

    ngOnInit() {}
}
