import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AuthInterceptor} from "./interceptors/auth.interceptor";


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
        VendorDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        FormsModule
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
