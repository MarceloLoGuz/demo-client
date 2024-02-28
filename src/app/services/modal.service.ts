import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class ModalService {
    constructor(private modalService: NgbModal) { }

    private closeModalSubject = new Subject<void>();

    closeModal$ = this.closeModalSubject.asObservable();

    open(content: any) {
        this.modalService.open(content);
    }

    closeModal() {
        this.closeModalSubject.next();
    }

    dismissAll() {
        this.modalService.dismissAll();
    }
}
