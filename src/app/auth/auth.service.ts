import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl = '/api';
	private token: string = '';

	constructor(private http: HttpClient) { }

	login(email: string, password: string): Observable<any> {
		return this.http.post(`${this.apiUrl}/auth/token/login/`, { email, password }).pipe(
			tap((response: any) => {
				this.token = response.token;
				localStorage.setItem('token', this.token);
			})
		);
	}

	getToken(): string | null {
		return this.token || localStorage.getItem('token');
	}

	isLoggedIn(): boolean {
		return !!this.getToken();
	}
}
