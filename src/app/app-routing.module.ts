import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VendorsComponent} from "./components/vendors/vendors.component";
import {VendorsHomeComponent} from "./components/vendors/vendors-home/vendors-home.component";
import {CreateVendorComponent} from "./components/vendors/create-vendor/create-vendor.component";
import {EditVendorComponent} from "./components/vendors/edit-vendor/edit-vendor.component";
import {VendorDetailsComponent} from "./components/vendors/vendor-details/vendor-details.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/vendors",
        pathMatch: "full"
    },
    {
        path: "vendors",
        component: VendorsComponent,
        canActivate: [AuthGuard],
        children: [
            {path: "", component: VendorsHomeComponent, pathMatch: "full"},
            {path: "create", component: CreateVendorComponent},
            {path: ":id/edit", component: EditVendorComponent},
            {path: ":id", component: VendorDetailsComponent},
            {path: "**", component: NotFoundComponent}
        ]
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
