import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment as env} from "../../environments/environment";
import {AuthService} from "../services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        //check if this request for login of registration and add key to the request
        if (request.url.includes(env.firebase.auth.host)) {
            request = request.clone({
                setParams: { key: env.firebase.key}
            });
        } else if (this.auth.isTokenValid() && request.url.includes(env.firebase.app_host)) {
            const token = JSON.parse(localStorage.getItem("user_data") || "").idToken;
            if (token) {
                request = request.clone({
                    setParams: { auth: token }
                });
            }
        }
        return next.handle(request);

    }
}