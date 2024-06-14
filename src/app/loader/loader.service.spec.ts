import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
    let service: LoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoaderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should show loader', () => {
        service.showLoader();
        service.loader$.subscribe(isLoading => {
            expect(isLoading).toBeTrue();
        });
    });

    it('should hide loader', () => {
        service.showLoader();
        service.hideLoader();
        service.loader$.subscribe(isLoading => {
            expect(isLoading).toBeFalse();
        });
    });

    it('should not set request count below zero', () => {
        service.hideLoader();
        service.hideLoader();
        service.loader$.subscribe(isLoading => {
            expect(isLoading).toBeFalse();
        });
    });
});
