import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    if (token) {
        const cloned = req.clone({
            headers: req.headers.set('Authorization', `Token ${token}`)
        });
        return next(cloned);
    } else {
        return next(req);
    }
};
