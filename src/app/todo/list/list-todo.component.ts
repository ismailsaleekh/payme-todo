import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { ToDo } from '../todo.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-todo-list',
	templateUrl: './list-todo.component.html',
	styleUrls: ['./list-todo.component.scss'],
	standalone: true,
	imports: [CommonModule]
})
export class ListToDoComponent implements OnInit {
	todos: ToDo[] = [];
	count: number = 0;
	limit: number = 10;
	offset: number = 0;
	sortBy: string = 'created_at';
	sortOrder: string = 'asc';
	errorMessage: string | null = null;

	constructor(private todoService: ToDoService, private router: Router) { }

	ngOnInit(): void {
		this.loadToDos();
	}

	loadToDos(): void {
		this.todoService.getToDos(this.limit, this.offset, this.sortBy, this.sortOrder).subscribe({
			next: (response) => {
				this.todos = response.results;
				this.count = response.count;
			},
			error: (error) => {
				this.errorMessage = 'Error loading todos. Please try again.';
				console.error('Error loading todos:', error);
			}
		});
	}

	loadNextPage(): void {
		if (this.offset + this.limit < this.count) {
			this.offset += this.limit;
			this.loadToDos();
		}
	}

	loadPreviousPage(): void {
		if (this.offset - this.limit >= 0) {
			this.offset -= this.limit;
			this.loadToDos();
		}
	}

	changeSortOrder(event: any): void {
		const sortBy = event.target.value;
		if (this.sortBy === sortBy) {
			this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			this.sortBy = sortBy;
			this.sortOrder = 'asc';
		}
		this.loadToDos();
	}

	addToDo(): void {
		this.router.navigate(['/todos/create']);
	}

	editToDo(id: string): void {
		this.router.navigate(['/todos/edit', id]);
	}

	viewToDo(id: string): void {
		this.router.navigate(['/todos/view', id]);
	}

	confirmDelete(id: string, title: string): void {
		if (confirm(`Are you sure you want to delete the To-Do: "${title}"?`)) {
			this.deleteToDo(id);
		}
	}

	deleteToDo(id: string): void {
		this.todoService.deleteToDo(id).subscribe({
			next: () => {
				this.loadToDos();
			},
			error: (error) => {
				this.errorMessage = 'Failed to delete To-Do. Please try again.';
				console.error('Error deleting To-Do:', error);
			}
		});
	}
}
