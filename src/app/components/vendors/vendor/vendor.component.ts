import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

import {faPlus, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Vendor} from "../../../models/vendor.model";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/User.model";

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

    user: User

    isLoading: boolean = false;
    constructor(private router: Router, public auth: AuthService) { }

    ngOnInit(): void {
        this.auth.user.subscribe(user => this.user = user);
    }

    showVendorDetails() {
        this.router.navigate(["vendors", this.vendorData.mobile]);
    }

    delete() {
        if(this.auth.canDelete(this.user)) {
            this.vendorDeleted.emit();
        }
    }
}
