import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let authService: jasmine.SpyObj<AuthService>;
	let router: jasmine.SpyObj<Router>;

	beforeEach(async () => {
		const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, LoginComponent],
			providers: [
				{ provide: AuthService, useValue: authServiceSpy },
				{ provide: Router, useValue: routerSpy }
			]
		}).compileComponents();

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display error message on login failure', () => {
		authService.login.and.returnValue(throwError(() => new Error('Login failed')));

		component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
		component.onSubmit();

		expect(authService.login).toHaveBeenCalled();
		expect(component.errorMessage).toBe('Login failed. Please try again.');
	});

	it('should navigate to /todos on successful login', () => {
		authService.login.and.returnValue(of({ token: '12345' }));

		component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
		component.onSubmit();

		expect(authService.login).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledWith(['/todos']);
	});

	it('should not call login if form is invalid', () => {
		component.loginForm.setValue({ email: '', password: 'password' });
		component.onSubmit();

		expect(authService.login).not.toHaveBeenCalled();
	});
});
