import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlingService {
    private errorSubject = new Subject<string | null>();
    private retrySubject = new Subject<void>();
    private dismissSubject = new Subject<void>();

    error$ = this.errorSubject.asObservable();
    retry$ = this.retrySubject.asObservable();
    dismiss$ = this.dismissSubject.asObservable();

    handleError(error: string) {
        this.errorSubject.next(error);
    }

    retry() {
        this.retrySubject.next();
    }

    dismiss() {
        this.dismissSubject.next();
    }

    clearError() {
        this.errorSubject.next(null);
    }
}
