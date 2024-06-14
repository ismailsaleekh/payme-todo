import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDoService } from '../todo.service';
import { ToDo } from '../todo.model';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-edit-todo',
	templateUrl: './edit-todo.component.html',
	styleUrls: ['./edit-todo.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, NgIf]
})
export class EditToDoComponent implements OnInit {
	editToDoForm: FormGroup;
	todoId: string;
	errorMessage: string | null = null;

	constructor(
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private todoService: ToDoService,
		private router: Router
	) {
		this.editToDoForm = this.fb.group({
			title: ['', Validators.required],
			completed: [false]
		});
		this.todoId = this.route.snapshot.paramMap.get('id') || '';
	}

	ngOnInit(): void {
		if (this.todoId) {
			this.todoService.getToDoById(this.todoId).subscribe({
				next: (todo: ToDo) => {
					this.editToDoForm.patchValue({
						title: todo.title,
						completed: todo.completed
					});
				},
				error: (error) => {
					this.errorMessage = 'Failed to load To-Do. Please try again.';
					console.error('Error:', error);
				}
			});
		}
	}

	onSubmit() {
		if (this.editToDoForm.valid) {
			this.todoService.updateToDo(this.todoId, {
				title: this.editToDoForm.value.title,
				completed: this.editToDoForm.value.completed
			}).subscribe({
				next: () => {
					this.router.navigate(['/todos']);
				},
				error: (error) => {
					this.errorMessage = 'Failed to update To-Do. Please try again.';
					console.error('Error:', error);
				}
			});
		}
	}

	goBack(): void {
		this.router.navigate(['/todos']);
	}
}
