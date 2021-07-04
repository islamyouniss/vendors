import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

import {VendorService} from "../../../services/vendor.service";
import {Vendor} from "../../../models/vendor.model";

import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

import {FileUpload} from "../../../models/FileUpload.model";
import {UploadFileService} from "../../../services/upload-file.service";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
    selector: 'app-vendor-form',
    templateUrl: './vendor-form.component.html',
    styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {
    faTrash = faTrash;
    faPlus = faPlus;

    @Input() vendorInfo: Vendor;
    vendorForm: FormGroup;

    currentFileUpload?: FileUpload;
    files: File[] = [];
    percentage: number = 0;
    completedUploadedFiles = [];

    constructor(private vendor: VendorService, private uploadService: UploadFileService, private toast: HotToastService) { }

    ngOnInit() {
        this.createForm();
    }

    get contactsFormArray() {
        return this.vendorForm.get('contacts') as FormArray;
    }

    private createForm() {
        let vendorName, vendorEmail, vendorPhone, vendorAddress, description, attachments;
        let vendorContacts = new FormArray([]);
        if (this.vendorInfo) {
            vendorName = this.vendorInfo.name;
            vendorEmail = this.vendorInfo.email;
            vendorPhone = this.vendorInfo.mobile;
            vendorAddress = this.vendorInfo.address;
            description = this.vendorInfo.description;
            if (this.vendorInfo.contacts) {
                for (let contact of this.vendorInfo.contacts) {
                    vendorContacts.push(this.createContactsFormGroup(contact));
                }
            }
            if (this.vendorInfo.attachments) {
                for (let attachment of this.vendorInfo.attachments) {
                    this.completedUploadedFiles.push(attachment);
                }
            }
        } else {
            vendorName = null;
            vendorEmail = null;
            vendorPhone = null;
            vendorAddress = null;
            description = null;
            vendorContacts.push(this.createContactsFormGroup());
        }

        this.vendorForm = new FormGroup({
            "vendorName": new FormControl(vendorName, Validators.required),
            "vendorEmail": new FormControl(vendorEmail, [Validators.required, Validators.email]),
            "vendorPhone": new FormControl(vendorPhone, Validators.required),
            "vendorAddress": new FormControl(vendorAddress, Validators.required),
            "description": new FormControl(description, Validators.required),
            "attachments": new FormControl(null, Validators.required),
            "contacts": vendorContacts
        });
    }

    createContactsFormGroup(contact?) {
        if (contact) {
            return new FormGroup({
                "contactName": new FormControl(contact.contactName, Validators.required),
                "contactMobile": new FormControl(contact.contactMobile, Validators.required),
                "contactEmail": new FormControl(contact.contactEmail, [Validators.required, Validators.email])
            });
        } else {
            return new FormGroup({
                "contactName": new FormControl(null, Validators.required),
                "contactMobile": new FormControl(null, Validators.required),
                "contactEmail": new FormControl(null, [Validators.required, Validators.email])
            });
        }
    }

    addContactFormGroup() {
        this.contactsFormArray.push(this.createContactsFormGroup());
    }

    deleteContact(contactIndex) {
        this.contactsFormArray.removeAt(contactIndex);
    }

    deleteAttachment(attachmentIndex) {
        console.log(this.vendorInfo.attachments[attachmentIndex]);
        this.completedUploadedFiles.splice(attachmentIndex, 1);
    }

    onSelectFiles(evt: Event) {
        const element = evt.currentTarget as HTMLInputElement;
        let files: FileList | null = element.files;
        for (let file of Array.from(files)) {
            this.currentFileUpload = new FileUpload(file);
            this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
                percentage => {
                    this.percentage = Math.round(percentage ? percentage : 0);
                },
                error => {
                    console.log(error);
                },
                () => {
                    this.completedUploadedFiles = this.uploadService.getFiles();
                }
            );
        }
    }

    onSubmitForm() {
        if (this.vendorInfo) {
            let attachments = [];
            for (let uploadedFile of this.completedUploadedFiles) {
                attachments.push({
                    name: uploadedFile.name,
                    url: uploadedFile.url
                });
            }
            this.vendorForm.value.id = this.vendorInfo.id;
            this.vendorForm.value.attachments = attachments;
            this.vendor.update(this.vendorInfo.id, this.vendorForm.value);
            this.toast.success('Vendor Updated', {dismissible: true,position: 'top-right'});
        } else {
            let attachments = []
            for (let uploadedFile of this.completedUploadedFiles) {
                attachments.push({
                    name: uploadedFile.name,
                    url: uploadedFile.url
                });
            }
            this.vendorForm.value.attachments = attachments;
            this.vendor.create(this.vendorForm.value);
            this.toast.success('Vendor Created', {dismissible: true,position: 'top-right'});
            this.vendorForm.reset();
        }
    }
}
