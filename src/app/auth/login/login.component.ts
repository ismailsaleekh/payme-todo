import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	standalone: true,
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
	loginForm: FormGroup;
	errorMessage: string | null = null;

	private authService = inject(AuthService);
	private router = inject(Router);

	constructor() {
		const fb = inject(FormBuilder);
		this.loginForm = fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	onSubmit(): void {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;
			this.authService.login(email, password).subscribe({
				next: () => this.router.navigate(['/todos']),
				error: err => this.errorMessage = 'Login failed. Please try again.'
			});
		}
	}
}
