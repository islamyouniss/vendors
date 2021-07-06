import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";

import {finalize, map, tap} from "rxjs/operators";

import {FileUpload} from "../models/FileUpload.model";
import {from, observable, Observable, of, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {
    private basePath: string = "crud";
    uploadedFiles = new Subject();

    constructor(private storage: AngularFireStorage) { }

    upload(fileUpload: FileUpload) {
        const filePath = `${this.basePath}/${new Date().getTime()}_${fileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);
        uploadTask.snapshotChanges().pipe(
            finalize(() => {
                storageRef.getDownloadURL().subscribe(downloadURL => {
                    fileUpload.url = downloadURL;
                    fileUpload.name = fileUpload.file.name;
                    this.uploadedFiles.next(fileUpload);
                });
            })
        ).subscribe();

        return uploadTask.percentageChanges();
    }

    getFiles() {
        return this.uploadedFiles;
    }

    deleteFile(fileUpload: FileUpload): void {
        this.deleteFileStorage(fileUpload.name);
    }

    private deleteFileStorage(name: string): void {
        const storageRef = this.storage.ref(this.basePath);
        storageRef.child(name).delete();
    }
}
