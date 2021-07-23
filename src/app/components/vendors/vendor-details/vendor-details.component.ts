import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

import {VendorService} from "../../../services/vendor.service";
import {Vendor} from "../../../models/vendor.model";
import {User} from "../../../models/User.model";
import {AuthService} from "../../../services/auth.service";


@Component({
    selector: 'app-vendor-details',
    templateUrl: './vendor-details.component.html',
    styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit, OnDestroy {
    isLoading: boolean = false;
    httpSubscription: Subscription
    vendorData: Vendor;
    currentId: string = "";
    user: User
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private vendor: VendorService,
                public auth: AuthService) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.currentId = params["id"];
        });
        this.auth.user.subscribe(user => this.user = user);
        this.isLoading = true;
        this.httpSubscription = this.vendor.get(this.currentId).subscribe(response_data => {
            this.isLoading = false;
            this.vendorData = response_data;
        });
    }

    ngOnDestroy() {
        this.httpSubscription.unsubscribe();
    }
}
