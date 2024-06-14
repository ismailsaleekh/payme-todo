import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private requestCount = 0;
    private loaderSubject = new BehaviorSubject<boolean>(false);
    loader$ = this.loaderSubject.asObservable();

    showLoader() {
        this.requestCount++;
        this.loaderSubject.next(true);
    }

    hideLoader() {
        this.requestCount--;
        
        if (this.requestCount < 0) {
            this.requestCount = 0;
        }

        if (this.requestCount === 0) {
            this.loaderSubject.next(false);
        }

    }
}
