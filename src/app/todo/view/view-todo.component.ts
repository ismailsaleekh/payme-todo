import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToDoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { ToDo } from '../todo.model';

@Component({
	standalone: true,
	selector: 'app-view-todo',
	templateUrl: './view-todo.component.html',
	styleUrls: ['./view-todo.component.scss'],
	imports: [CommonModule]
})
export class ViewToDoComponent implements OnInit {
	todo: ToDo | null = null;
	errorMessage: string | null = null;

	constructor(
		private todoService: ToDoService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.todoService.getToDoById(id).subscribe({
				next: (todo) => this.todo = todo,
				error: (err) => this.errorMessage = 'Error loading ToDo item.'
			});
		}
	}

	goBack(): void {
		this.router.navigate(['/todos']);
	}
}
