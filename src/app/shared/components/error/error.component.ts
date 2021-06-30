import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    @Input() error
    @Output() closeErrorMessage: EventEmitter<void> = new EventEmitter()
    constructor() { }

    ngOnInit(): void { }

    close() {
        this.closeErrorMessage.emit();
    }
}
