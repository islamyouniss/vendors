import {Component, OnInit} from '@angular/core';
import {VendorService} from "../../../services/vendor.service";
import {Vendor} from "../../../models/vendor.model";
import {NgForm} from "@angular/forms";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

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

    /*allVendors: Vendor[] = [];*/
    isUploadingFile: boolean = false;
    files: File[] = [];
    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: Observable<any>;
    downloadURL: string;

    constructor(private vendor: VendorService, private storage: AngularFireStorage) { }

    ngOnInit(): void { }

    onCreateVendor(form: NgForm) {
        this.vendor_data = {
            name: form.value.vendorName,
            address: form.value.vendorAddress,
            mobile: form.value.VendorPhone,
            email: form.value.vendorEmail,
            description: form.value.description,
            attachment: this.downloadURL,
            contacts: [
                {
                    name: form.value.contactName,
                    mobile: form.value.contactMobile,
                    email: form.value.contactEmail
                }
            ]
        }
        this.vendor.create(this.vendor_data);
        form.resetForm();
        this.isUploadingFile = false;
        this.isUploadingFile = false;
    }

    uploadFile(fileToBeUploaded) {
        const filePath = "crud/" + Date.now() + "_" + fileToBeUploaded.name;
        const ref = this.storage.ref(filePath);
        this.task = this.storage.upload(filePath, fileToBeUploaded);
        this.percentage = this.task.percentageChanges();
        /*this.snapshot = this.task.snapshotChanges().pipe(
            finalize(async () => {
                this.downloadURL = await ref.getDownloadURL().toPromise();
            })
        )*/
        this.isUploadingFile = true;
        this.task.snapshotChanges().subscribe(
            async m => this.downloadURL = await m.ref.getDownloadURL().
            then(f => {
                console.clear();
                return f
            })
        )
    }

    onSelectFiles(evt: Event) {
        const element = evt.currentTarget as HTMLInputElement;
        let files: FileList | null = element.files;
        this.uploadFile(files[0]);
    }

}
