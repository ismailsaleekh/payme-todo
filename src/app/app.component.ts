import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorNotificationComponent } from './error/error-notification.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TitleService } from './title.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ErrorNotificationComponent, CommonModule, LoaderComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	constructor(private titleService: TitleService) { }
	title = 'todo-app';
}
