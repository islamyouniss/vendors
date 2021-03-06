import {Component, OnInit} from '@angular/core';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Vendor} from "../../../models/vendor.model";
import {VendorService} from "../../../services/vendor.service";
import { HotToastService } from '@ngneat/hot-toast';
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/User.model";

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
    user: User;
    constructor(private vendor: VendorService, public auth: AuthService, private toast: HotToastService) { }

    ngOnInit(): void {
        this.auth.user.subscribe(user => this.user = user);
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
        this.vendor.delete(vendor.id);
        this.toast.success('Vendor Deleted', {dismissible: true,position: 'top-right'});
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
