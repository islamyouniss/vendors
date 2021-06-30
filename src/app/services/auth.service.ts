import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {environment as env} from "../../environments/environment";
import {NgForm} from "@angular/forms";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "../models/User.model";
import {Router} from "@angular/router";


export interface firebaseResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    /*private readonly token: string = "token";
    private readonly refresh_token: string = "";*/

    user = new BehaviorSubject<User | null>(null);
    logUserOutTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    autoLogUserIn() {
        const user_data = JSON.parse(localStorage.getItem("user_data") || "{}");
        if (user_data === "") {
            return;
        }
        const expiration_date = new Date(new Date().getTime() + (+user_data.expiresIn * 1000));
        const userToBeLoggedIn = new User(user_data.email, user_data.localId, user_data.idToken, expiration_date);
        if (userToBeLoggedIn.token) {
            const timeLeftToLogout = new Date(userToBeLoggedIn.token_expiration).getTime() - new Date().getTime();
            this.autoLogUserOut(timeLeftToLogout);
            this.user.next(userToBeLoggedIn);
        }
    }

    autoLogUserOut(expiresIn: number) {
        this.logUserOutTimer = setTimeout(() => this.logout(), expiresIn);
    }

    register(form: NgForm) {
        const host = env.firebase.auth.host + "signUp";
        const body = {
            email: form.form.value.email,
            password: form.form.value.password,
            returnSecureToken: true
        };
        return this.http.post<firebaseResponse>(host, body).pipe(
            catchError(AuthService.handleErrors),
            tap((response_data: firebaseResponse) => {
                this.logUserIn(response_data);
            }));
    }

    login(form: NgForm) {
        const host = env.firebase.auth.host + "signInWithPassword";
        const body = {
            email: form.form.value.email,
            password: form.form.value.password,
            returnSecureToken: true
        };

        return this.http.post<firebaseResponse>(host, body).pipe(
            catchError(AuthService.handleErrors),
            tap((response_data: firebaseResponse) => {
                this.logUserIn(response_data);
            })
        );
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem("user_data");
        if (this.logUserOutTimer) {
            clearTimeout(this.logUserOutTimer);
        }
        this.router.navigate(["/login"]);
        this.logUserOutTimer = null;
    }

    private static handleErrors(errorResponse: HttpErrorResponse) {
        console.log("error handling")
        let error_message = "Unknown Error Occurred!";

        switch (errorResponse.error.error.message) {
            case "EMAIL_NOT_FOUND": {
                error_message = "You Are Not Registered!";
                break;
            }
            case "INVALID_PASSWORD": {
                error_message = "Wrong Password";
                break;
            }
            case "EMAIL_EXISTS": {
                error_message = "You Are Already Registered!";
                break;
            }
            case "TOO_MANY_ATTEMPTS_TRY_LATER": {
                error_message = "You Have Tried Too Many Times, Please Try Again Later!"
                break;
            }
        }

        return throwError(error_message);
    }

    private logUserIn(user_data: firebaseResponse) {
        const expiration_date = new Date(new Date().getTime() + (+user_data.expiresIn * 1000));
        const user = new User(user_data.email, user_data.localId, user_data.idToken, expiration_date);

        localStorage.setItem("user_data", JSON.stringify(user_data));
        //localStorage.setItem("refresh_token", user_data.refreshToken);
        this.autoLogUserOut(expiration_date.getTime());
        this.user.next(user);
    }

    isTokenValid() {
        return !!this.user.subscribe(currentUser => currentUser?.token);
    }
}
