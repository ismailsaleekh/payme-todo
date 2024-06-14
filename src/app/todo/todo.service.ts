import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo, ToDoResponse } from './todo.model';

@Injectable({
	providedIn: 'root'
})
export class ToDoService {
	private apiUrl = '/api/todo';

	constructor(private http: HttpClient) { }

	getToDos(limit: number = 10, offset: number = 0, sortBy: string = 'created_at', sortOrder: string = 'asc'): Observable<ToDoResponse> {
		return this.http.get<ToDoResponse>(`${this.apiUrl}/?limit=${limit}&offset=${offset}&ordering=${sortOrder === 'asc' ? '' : '-'}${sortBy}`);
	}

	getToDoById(id: string): Observable<ToDo> {
		return this.http.get<ToDo>(`${this.apiUrl}/${id}`);
	}

	createToDo(todo: Partial<ToDo>): Observable<ToDo> {
		return this.http.post<ToDo>(this.apiUrl + '/', { ...todo, user: 1 });
	}

	updateToDo(id: string, todo: Partial<ToDo>): Observable<ToDo> {
		return this.http.put<ToDo>(`${this.apiUrl}/${id}/`, {...todo, user: 1});
	}

	deleteToDo(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}