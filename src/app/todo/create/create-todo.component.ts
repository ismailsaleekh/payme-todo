import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToDoService } from '../todo.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-create-todo',
    templateUrl: './create-todo.component.html',
    styleUrls: ['./create-todo.component.scss'],
    imports: [CommonModule, ReactiveFormsModule]
})
export class CreateToDoComponent {
    addToDoForm: FormGroup;
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        private todoService: ToDoService,
        private router: Router
    ) {
        this.addToDoForm = this.fb.group({
            title: ['', Validators.required],
            completed: [false]
        });
    }

    onSubmit() {
        if (this.addToDoForm.valid) {
            this.todoService.createToDo({
                title: this.addToDoForm.value.title,
                completed: this.addToDoForm.value.completed,
                user: 1
            }).subscribe({
                next: () => {
                    this.router.navigate(['/todos']);
                },
                error: (error) => {
                    this.errorMessage = 'Failed to add To-Do. Please try again.';
                    console.error('Error:', error);
                }
            });
        }
    }

    goBack(): void {
		this.router.navigate(['/todos']);
	}
}
