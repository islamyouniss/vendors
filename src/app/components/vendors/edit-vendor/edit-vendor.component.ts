import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {VendorService} from "../../../services/vendor.service";
import {Vendor} from "../../../models/vendor.model";

@Component({
    selector: 'app-edit-vendor',
    templateUrl: './edit-vendor.component.html',
    styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit, OnDestroy {
    isLoading: boolean = false;
    gettingVendorDataSubscription: Subscription;
    vendor_data: Vendor;
    currentId: string = "";

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private vendor: VendorService,
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.currentId = params["id"];
        });

        this.isLoading = true;
        this.gettingVendorDataSubscription = this.vendor.get(this.currentId).subscribe(response_data => {
            this.isLoading = false;
            this.vendor_data = response_data;
        });
    }

    ngOnDestroy() {
        this.gettingVendorDataSubscription.unsubscribe();
    }
}
