import {Component, Input, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'app-upload-task',
    templateUrl: './upload-task.component.html',
    styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {
    @Input() file: File;
    task: AngularFireUploadTask;
    percentage: Observable<number>;
    snapshot: Observable<any>;
    downloadURL: string;

    constructor(private storage: AngularFireStorage) { }

    ngOnInit(): void {
        this.uploadFile();
    }

    uploadFile() {
        const filePath = "crud/" + Date.now() + "_" + this.file.name;
        const ref = this.storage.ref(filePath);
        this.task = this.storage.upload(filePath, this.file);
        this.percentage = this.task.percentageChanges();
        /*this.snapshot = this.task.snapshotChanges().pipe(
            finalize(async () => {
                this.downloadURL = await ref.getDownloadURL().toPromise();
            })
        )*/
        this.task.snapshotChanges().subscribe(
            async m => this.downloadURL = await m.ref.getDownloadURL().then(f => {return f})
        )
    }
}
