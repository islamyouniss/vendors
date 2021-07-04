import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {VendorService} from "../../../services/vendor.service";
import {Vendor} from "../../../models/vendor.model";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";



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

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private vendor: VendorService) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.currentId = params["id"];
        });

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
