import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {VendorService} from "../../../services/vendor.service";
import {Observable, Subscription} from "rxjs";
import {Vendor} from "../../../models/vendor.model";
import {map} from "rxjs/operators";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";

@Component({
    selector: 'app-edit-vendor',
    templateUrl: './edit-vendor.component.html',
    styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit, OnDestroy {
    isLoading: boolean = false;
    httpSubscription: Subscription;
    vendorData: Vendor;
    currentId: string = "";
    isUploadingFile: boolean = false;
    editForm: FormGroup

    files: File[] = [];
    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: Observable<any>;
    downloadURL: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private vendor: VendorService, private storage: AngularFireStorage) { }


    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.currentId = params["id"]
        });

        this.isLoading = true;
        this.httpSubscription = this.vendor.read(this.currentId).subscribe(response_data => {
            this.isLoading = false;
            this.vendorData = response_data;
            this.initEditForm();
        });
    }


    onUpdateVendor() {
        let updatedVendorData: Vendor = {
            name: this.editForm.value.vendorName,
            address: this.editForm.value.vendorAddress,
            mobile: this.editForm.value.vendorPhone,
            email: this.editForm.value.vendorEmail,
            description: this.editForm.value.description,
            attachment: "",
            contacts: [
                {
                    name: this.editForm.value.contactName,
                    mobile: this.editForm.value.contactMobile,
                    email: this.editForm.value.contactEmail
                }
            ]
        }
        this.vendor.update(this.editForm.value.vendorPhone, updatedVendorData);
    }

    private initEditForm() {
        /*let vendorName = this.vendorData.name || "";
        let vendorEmail = this.vendorData.email;
        let vendorPhone = this.vendorData.mobile;
        let vendorAddress = this.vendorData.address;
        let description = this.vendorData.description;*/
        this.editForm = new FormGroup({
            "vendorName": new FormControl(this.vendorData.name),
            "vendorEmail": new FormControl(this.vendorData.email),
            "vendorPhone": new FormControl(this.vendorData.mobile),
            "vendorAddress": new FormControl(this.vendorData.address),
            "description": new FormControl(this.vendorData.description),
            "contactName": new FormControl(this.vendorData.contacts[0].name),
            "contactMobile": new FormControl(this.vendorData.contacts[0].mobile),
            "contactEmail": new FormControl(this.vendorData.contacts[0].email),
        });
    }

    uploadFile(fileToBeUploaded) {
        this.isUploadingFile = true;
        const filePath = "crud/" + Date.now() + "_" + fileToBeUploaded.name;
        const ref = this.storage.ref(filePath);
        this.task = this.storage.upload(filePath, fileToBeUploaded);
        this.percentage = this.task.percentageChanges();
        this.task.snapshotChanges().subscribe(
            async m => this.downloadURL = await m.ref.getDownloadURL().then(f => {
                console.clear();
                this.isUploadingFile = false;
                return f
            })
        )
    }

    onSelectFiles(evt: Event) {
        const element = evt.currentTarget as HTMLInputElement;
        let files: FileList | null = element.files;
        this.uploadFile(files[0]);
    }

    ngOnDestroy() {
        this.httpSubscription.unsubscribe();
    }
}
