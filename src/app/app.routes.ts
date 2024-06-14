import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
        data: { title: 'Login' }
    },
    {
        path: 'todos',
        loadComponent: () => import('./todo/list/list-todo.component').then(m => m.ListToDoComponent),
        canActivate: [authGuard],
        data: { title: 'To-Do List' }
    },
    {
        path: 'todos/create',
        loadComponent: () => import('./todo/create/create-todo.component').then(m => m.CreateToDoComponent),
        canActivate: [authGuard],
        data: { title: 'Create To-Do' }
    },
    {
        path: 'todos/edit/:id',
        loadComponent: () => import('./todo/edit/edit-todo.component').then(m => m.EditToDoComponent),
        canActivate: [authGuard],
        data: { title: 'Edit To-Do' }
    },
    {
        path: 'todos/view/:id',
        loadComponent: () => import('./todo/view/view-todo.component').then(m => m.ViewToDoComponent),
        canActivate: [authGuard],
        data: { title: 'View To-Do' }
    },
    {
        path: '',
        redirectTo: '/todos',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
