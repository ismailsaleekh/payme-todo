import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlingService } from './error-handler.service';

@Component({
	selector: 'app-error-notification',
	template: `
    <div *ngIf="errorMessage" class="error-notification">
      <p>{{ errorMessage }}</p>
      <button (click)="retry()">Retry</button>
      <button (click)="dismiss()">Dismiss</button>
    </div>
  `,
	styles: [`
    .error-notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #f8d7da;
      color: #721c24;
      padding: 10px;
      border: 1px solid #f5c6cb;
      border-radius: 5px;
      display: flex;
      align-items: center;
      z-index: 1000;
      animation: fadeOut 20s forwards;
    }
    .error-notification p {
      margin: 0;
      padding-right: 10px;
    }
    .error-notification button {
      margin-left: 10px;
    }
    @keyframes fadeOut {
      0% { opacity: 1; }
      90% { opacity: 1; }
      100% { opacity: 0; display: none; }
    }
  `],
	standalone: true,
	imports: [CommonModule]
})
export class ErrorNotificationComponent {
	errorMessage: string | null = null;

	constructor(private errorHandlingService: ErrorHandlingService) {
		this.errorHandlingService.error$.subscribe(error => {
			this.errorMessage = error ? 'Something went wrong.' : null;
		});
	}

	retry() {
		this.errorHandlingService.retry();
		this.errorHandlingService.clearError();
	}

	dismiss() {
		this.errorHandlingService.dismiss();
		this.errorHandlingService.clearError();
	}
}
