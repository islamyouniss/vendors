import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {VendorsComponent} from './components/vendors/vendors.component';
import {VendorsHomeComponent} from './components/vendors/vendors-home/vendors-home.component';
import {VendorComponent} from './components/vendors/vendor/vendor.component';
import {CreateVendorComponent} from './components/vendors/create-vendor/create-vendor.component';
import {EditVendorComponent} from './components/vendors/edit-vendor/edit-vendor.component';
import {AuthComponent} from './components/auth/auth.component';
import {LoginComponent} from './components/auth/login/login.component';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { VendorDetailsComponent } from './components/vendors/vendor-details/vendor-details.component';
import { ErrorComponent } from './shared/components/error/error.component';

import {AuthInterceptor} from "./interceptors/auth.interceptor";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AngularFireAuthModule } from '@angular/fire/auth';

import {environment} from "../environments/environment";
import { VendorFormComponent } from './components/vendors/vendor-form/vendor-form.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { SignupComponent } from './components/auth/signup/signup.component';


@NgModule({
    declarations: [
        AppComponent,
        VendorsComponent,
        VendorsHomeComponent,
        VendorComponent,
        CreateVendorComponent,
        EditVendorComponent,
        AuthComponent,
        LoginComponent,
        NavbarComponent,
        NotFoundComponent,
        SpinnerComponent,
        VendorDetailsComponent,
        ErrorComponent,
        VendorFormComponent,
        SignupComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,

        AngularFireModule.initializeApp(environment.firebase.config),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule, HotToastModule.forRoot() // storage
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
