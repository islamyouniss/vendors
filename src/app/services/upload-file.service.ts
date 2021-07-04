import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import {FileUpload} from "../models/FileUpload.model";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {
    private basePath: string = "crud";
    uploadedFiles = [];
    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

    pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
        const filePath = `${this.basePath}/${fileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, fileUpload.file);

        uploadTask.snapshotChanges().pipe(
            finalize(() => {
                storageRef.getDownloadURL().subscribe(downloadURL => {
                    fileUpload.url = downloadURL;
                    fileUpload.name = fileUpload.file.name;
                    this.uploadedFiles.push(fileUpload);
                });
            })
        ).subscribe();
        return uploadTask.percentageChanges();
    }

    getFiles() {
        return this.uploadedFiles
    }

    deleteFile(fileUpload: FileUpload): void {
        this.deleteFileStorage(fileUpload.name);
    }

    private deleteFileStorage(name: string): void {
        const storageRef = this.storage.ref(this.basePath);
        storageRef.child(name).delete();
    }
}
