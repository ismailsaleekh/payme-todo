import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, merge, Subject } from 'rxjs';
import { catchError, finalize, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handler.service';
import { LoaderService } from '../loader/loader.service';

export const errorInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
    const errorHandlingService = inject(ErrorHandlingService);
    const loaderService = inject(LoaderService);

    loaderService.showLoader();

    const handleRequest = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
        return next(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 504) {
                    loaderService.hideLoader();
                    errorHandlingService.handleError(`Error Code: ${error.status}\nMessage: ${error.message}`);

                    const retry$ = new Subject<void>();
                    const dismiss$ = new Subject<void>();

                    errorHandlingService.retry$.pipe(take(1)).subscribe(() => {
                        retry$.next();
                        retry$.complete();
                        dismiss$.complete();
                    });

                    errorHandlingService.dismiss$.pipe(take(1)).subscribe(() => {
                        dismiss$.next();
                        dismiss$.complete();
                        retry$.complete();
                    });

                    return merge(
                        retry$.pipe(
                            map(v => true),
                        ),
                        dismiss$.pipe(map(v => null))
                    ).pipe(
                        take(1),
                        switchMap(action => {
                            if (action === null) {
                                return throwError(() => error);
                            }
                            loaderService.showLoader();
                            return handleRequest(req, next); // Recursive call for retry
                        })
                    );
                } else {
                    loaderService.hideLoader();
                    return throwError(() => error);
                }
            }),
            finalize(() => loaderService.hideLoader())
        );
    };

    return handleRequest(req, next);
};
