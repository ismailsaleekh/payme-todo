import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToDoService } from './todo.service';
import { ToDo, ToDoResponse } from './todo.model';

describe('ToDoService', () => {
	let service: ToDoService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ToDoService]
		});
		service = TestBed.inject(ToDoService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should retrieve todos', () => {
		const mockResponse = {
			count: 1,
			results: [
				{ id: '1', title: 'Test ToDo', completed: false, created_at: '', updated_at: '', user: 1 }
			]
		};

		service.getToDos().subscribe(todos => {
			expect(todos).toEqual(mockResponse as any);
		});

		const req = httpMock.expectOne('/api/todo/?limit=10&offset=0&ordering=created_at');
		expect(req.request.method).toBe('GET');
		req.flush(mockResponse);
	});

	it('should retrieve a todo by id', () => {
		const mockToDo: ToDo = { id: '1', title: 'Test ToDo', completed: false, created_at: '', updated_at: '', user: 1 };

		service.getToDoById('1').subscribe(todo => {
			expect(todo).toEqual(mockToDo);
		});

		const req = httpMock.expectOne('/api/todo/1');
		expect(req.request.method).toBe('GET');
		req.flush(mockToDo);
	});

	it('should create a new todo', () => {
		const newToDo: Partial<ToDo> = { title: 'New ToDo', completed: false };
		const createdToDo: ToDo = { id: '1', title: 'New ToDo', completed: false, created_at: '', updated_at: '', user: 1 };

		service.createToDo(newToDo).subscribe(todo => {
			expect(todo).toEqual(createdToDo);
		});

		const req = httpMock.expectOne('/api/todo/');
		expect(req.request.method).toBe('POST');
		req.flush(createdToDo);
	});

	it('should update an existing todo', () => {
		const updatedToDo: Partial<ToDo> = { title: 'Updated ToDo', completed: true };
		const updatedToDoResponse: ToDo = { id: '1', title: 'Updated ToDo', completed: true, created_at: '', updated_at: '', user: 1 };

		service.updateToDo('1', updatedToDo).subscribe(todo => {
			expect(todo).toEqual(updatedToDoResponse);
		});

		const req = httpMock.expectOne('/api/todo/1/');
		expect(req.request.method).toBe('PUT');
		req.flush(updatedToDoResponse);
	});

});
