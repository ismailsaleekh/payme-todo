import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RetryService {
    private retrySubject = new Subject<any>();
    retry$ = this.retrySubject.asObservable();

    retry(observable: Observable<any>): Observable<any> {
        return observable;
    }

    resolveRetry(response: any) {
        this.retrySubject.next(response);
    }
}
