import {Component, ComponentRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

import {AuthService} from "../../../services/auth.service";

import {HotToastService} from "@ngneat/hot-toast";



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    isLoading: boolean = false;

    constructor(private auth: AuthService, private router: Router, private toast: HotToastService) { }

    ngOnInit(): void { }

    login(loginForm: NgForm) {
        this.isLoading = true;
        this.auth.login(loginForm.value.email, loginForm.value.password).then(() => {
            this.router.navigate(["/vendors"]);
        }).catch(err => {
            this.toast.error(err.message, {dismissible: true, position: 'top-center'});
            this.isLoading = false;
            loginForm.resetForm();
        })
        loginForm.resetForm();
    }
}
