import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TitleService {
    private router = inject(Router);
    private title = inject(Title);

    constructor() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.router.routerState.snapshot.root),
            map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }),
            map(route => route.data)
        ).subscribe(data => {
            const title = data['title'];
            if (title) {
                this.title.setTitle(title);
            }
        });
    }
}
