export interface Vendor {
    name: string;
    address: string;
    mobile: string;
    email: string;
    description: string;
    attachment: string;
    contacts: [
        {
            name: string;
            mobile: string,
            email: string
        }
    ];
}
