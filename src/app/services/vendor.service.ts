import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

import {environment} from "../../environments/environment";
import {Vendor} from "../models/vendor.model";

@Injectable({
    providedIn: 'root'
})
export class VendorService {
    url = environment.firebase.app_host + "vendors.json";

    constructor(private http: HttpClient) {  }

    create(data: Vendor) {
        let new_vendor_data = this.convert_form_to_vendor(data);
        this.http.post(this.url, new_vendor_data).subscribe(responseData => {
            console.log(responseData);
        });
    }

    list() {
        return this.http.get(this.url).pipe(map((response_data) => {
            let allVendors: Vendor[] = Object.values(response_data);
            Object.values(response_data).forEach((vendor,index) => {
                vendor.id = Object.keys(response_data)[index];
            });

            return allVendors;
        }));
    }

    get(id: string) {
        return this.http.get(this.url, {
            params: {
                orderBy: '"mobile"',
                equalTo: '"' + id + '"'
            }
        }).pipe(map((response_data) => {
            let vendor: Vendor = Object.values(response_data)[0];
            vendor.id = Object.keys(response_data)[0];
            return vendor;
        }));
    }

    update(id: string, updatedData: Vendor) {
        let new_vendor_data = this.convert_form_to_vendor(updatedData);
        return this.http.patch(this.url, new_vendor_data).subscribe();
    }


    convert_form_to_vendor(form_values) {
        let data = {};
        let data_without_id = {
            name: form_values.vendorName,
            address: form_values.vendorAddress,
            mobile: form_values.vendorPhone,
            email: form_values.vendorEmail,
            description: form_values.description,
            attachments: form_values.attachments,
            contacts: form_values.contacts
        }

        if(form_values.id) {
            let id = form_values.id
            data[id] = data_without_id;
        } else {
            data = data_without_id;
        }
        return JSON.stringify(data);
    }

    delete(id: string) {
        let itemToBeDeletedUrl = this.url.replace(".json", "/") + id + ".json";
        this.http.delete(itemToBeDeletedUrl).subscribe();
    }

    put(vendors: Vendor[]) {
        this.http.put(this.url, vendors).subscribe();
    }
}
