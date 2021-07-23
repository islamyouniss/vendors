import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "../../../services/auth.service";

import {HotToastService} from "@ngneat/hot-toast";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    isLoading: boolean = false;

    constructor(
        private auth: AuthService,
        private router: Router,
        private toast: HotToastService
    ) { }

    ngOnInit(): void { }

    signup(signupForm: NgForm) {
        this.isLoading = true;
        console.log(signupForm.value.userRole);
        this.auth.signup(signupForm.value.name, signupForm.value.email, signupForm.value.password, signupForm.value.userRole).then(() => {
            this.isLoading = false;
            this.toast.success("User Created Successfully", {dismissible: true, position: 'top-right'});
            signupForm.resetForm();
        }).catch(err => {
            this.toast.error(err.message, {dismissible: true, position: 'top-right'});
            this.isLoading = false;
            signupForm.resetForm();
        })
        signupForm.resetForm();
    }
}
