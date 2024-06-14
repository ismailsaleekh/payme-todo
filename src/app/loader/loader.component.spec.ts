import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs';

describe('LoaderComponent', () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;
    let loaderService: LoaderService;
    let loaderSubject: BehaviorSubject<boolean>;

    beforeEach(async () => {
        loaderSubject = new BehaviorSubject<boolean>(false);

        await TestBed.configureTestingModule({
            imports: [LoaderComponent],
            providers: [
                { provide: LoaderService, useValue: { loader$: loaderSubject.asObservable() } }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        loaderService = TestBed.inject(LoaderService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display loader when isLoading is true', () => {
        loaderSubject.next(true);
        fixture.detectChanges();
        const loaderElement: HTMLElement = fixture.nativeElement.querySelector('.loader-overlay');
        expect(loaderElement).not.toBeNull();
    });

    it('should hide loader when isLoading is false', () => {
        loaderSubject.next(false);
        fixture.detectChanges();
        const loaderElement: HTMLElement = fixture.nativeElement.querySelector('.loader-overlay');
        expect(loaderElement).toBeNull();
    });
});
