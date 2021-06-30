import {Component, OnInit} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Vendor} from "../../../models/vendor.model";
import {VendorService} from "../../../services/vendor.service";

@Component({
    selector: 'app-vendors-home',
    templateUrl: './vendors-home.component.html',
    styleUrls: ['./vendors-home.component.scss']
})
export class VendorsHomeComponent implements OnInit {
    faPlus = faPlus

    isLoading: boolean = false;
    error;
    allVendors: Vendor[] = [];

    constructor(private vendor: VendorService) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.vendor.list().subscribe((v:Vendor[]) => {
            this.isLoading = false;
            this.allVendors = v;
        }, (err)=> {
            this.handleRetrievingDataErrors(err);
        });
    }

    deleteVendor(vendor: Vendor) {
        const toBeDeletedIndex = this.allVendors.indexOf(this.allVendors.find(x => x.mobile == vendor.mobile));
        this.allVendors.splice(toBeDeletedIndex, 1);
        this.vendor.overwrite(this.allVendors);
    }


    handleRetrievingDataErrors(err: any) {
        this.isLoading = false;
        this.error = {
            code: err.status,
            text: err.statusText,
            message: err.error.error
        }
    }
}
