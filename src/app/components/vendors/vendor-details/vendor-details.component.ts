import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VendorService} from "../../../services/vendor.service";
import {Vendor} from "../../../models/vendor.model";



@Component({
    selector: 'app-vendor-details',
    templateUrl: './vendor-details.component.html',
    styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
    isLoading: boolean = false;
    vendorData: Vendor;
    currentId: string = "";

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private vendor: VendorService) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(r => {
            this.currentId = r.id;
        });

        this.isLoading = true;
        this.vendor.get(this.currentId).subscribe(response_data => {
            this.isLoading = false;
            this.vendorData = response_data;
        });

    }
}
