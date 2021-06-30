import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

import {faPlus, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Vendor} from "../../../models/vendor.model";

@Component({
    selector: 'app-vendor',
    templateUrl: './vendor.component.html',
    styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
    faTrash = faTrash;
    faEdit = faEdit;
    faPlus = faPlus;

    @Input() vendorData: Vendor;
    @Output() vendorDeleted = new EventEmitter<void>()

    isLoading: boolean = false;
    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    showVendorDetails() {
        this.router.navigate(["vendors", this.vendorData.mobile]);
    }

    delete() {
        this.vendorDeleted.emit()
    }
}
