import {Form} from "@angular/forms";

export interface Vendor {
    id?: string;
    name: string;
    address: string;
    mobile: string;
    email: string;
    description: string;
    attachments: [
        {
            name: string;
            url: string
        }
    ];
    contacts: [
        {
            contactName: string;
            contactMobile: string;
            contactEmail: string
        }
    ];
}

/*export class Vendor {
    constructor(vendor: Vendor) { }
}*/
