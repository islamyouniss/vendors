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
        this.http.post(this.url, data).subscribe(responseData => {
            console.log(responseData);
        });
    }

    list() {
        return this.http.get(this.url).pipe(map((response_data) => {
            let allVendors: Vendor[] = Object.values(response_data);
            return allVendors;
        }));
    }

    read(id: string) {
        return this.http.get(this.url, {
            params: {
                orderBy: '"mobile"',
                equalTo: '"' + id + '"'
            }
        }).pipe(map((response_data) => {
            let vendor: Vendor = Object.values(response_data)[0];
            return vendor;
        }));
    }

    update(id: string, updatedData: Vendor) {
        return this.http.patch(this.url, updatedData).subscribe();
    }

    delete() {

    }

    overwrite(vendors: Vendor[]) {
        this.http.put(this.url, vendors).subscribe();
    }
}
