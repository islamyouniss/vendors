import {Component, OnInit} from '@angular/core';
import {VendorService} from "../../../services/vendor.service";
import {Vendor} from "../../../models/vendor.model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-create-vendor',
    templateUrl: './create-vendor.component.html',
    styleUrls: ['./create-vendor.component.scss']
})
export class CreateVendorComponent implements OnInit {
    vendor_data: Vendor;
    /*    vendor_data: Vendor = {
            name: "Bin Dawood",
            address: "Jeddah",
            mobile: "111",
            email: "sales@bindawood.com",
            description: "Bin Dawood Stores",
            attachment: "",
            contacts: [
                {
                    name: "Muhammad",
                    mobile: "111222",
                    email: "muhammad@bindawood.com"
                }
            ]
        };
        vendor_data_2: Vendor = {
            "address": "Jeddah",
            "attachment": "",
            "contacts": [{
                "email": "ahmad@banda.com",
                "mobile": "6677889910",
                "name": "Ahmad"
            }],
            "description": "Banda Stores ",
            "email": "sales@banda.com",
            "mobile": "1122334455",
            "name": "Banda"
        };*/

    allVendors: Vendor[] = [];

    files: File[] = [];

    constructor(private vendor: VendorService) { }

    ngOnInit(): void {
        //this.vendor.create(this.vendor_data_2);
    }

    onCreateVendor(form: NgForm) {
        this.vendor_data = {
            name: form.value.vendorName,
            address: form.value.vendorAddress,
            mobile: form.value.VendorPhone,
            email: form.value.vendorEmail,
            description: form.value.description,
            attachment: form.value.attachment,
            contacts: [
                {
                    name: form.value.contactName,
                    mobile: form.value.contactMobile,
                    email: form.value.contactEmail
                }
            ]
        }
        //this.vendor.create(this.vendor_data);
        console.log(form.value);
    }

    onSelectFiles(evt: Event) {
        const element = evt.currentTarget as HTMLInputElement;
        let files: FileList | null = element.files;
        for (let i = 0; i < files.length; i++) {
            this.files.push(files.item(i));
        }
    }

    AngularFireStorage
}
