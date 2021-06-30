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

    allVendors: Vendor[] = [];

    constructor(private vendor: VendorService) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.vendor.list().subscribe((v:Vendor[]) => {
            this.isLoading = false;
            this.allVendors = v;
        });
    }

}
