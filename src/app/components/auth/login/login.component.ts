import {Component, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import { AuthService } from "../../../services/auth.service";

import {Router} from "@angular/router";

import {faUser} from "@fortawesome/free-solid-svg-icons";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    faUser = faUser;
    @ViewChild("errorMessage", {static: true}) errorMessageComponent : ComponentRef<any>;
    isLoggedIn: boolean = false;
    isLoading: boolean = false;
    error = "";
    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void { }

    login(loginForm: NgForm) {
        this.isLoading = true;
        this.auth.login(loginForm).subscribe((response) => {
            this.isLoading = false;
            this.router.navigate(["/"]);
            this.isLoggedIn = true;
        }, (err_message) => {
            this.isLoading = false;
            console.log(err_message);
            this.error = err_message

            /*this.showMessage(err_message);*/
        });
        loginForm.resetForm();
    }

    removeErrorMessage() {
        this.error = "";
        this.errorMessageComponent.destroy();
    }
}
