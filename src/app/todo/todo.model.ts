export interface ToDo {
    id: string;
    title: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
    user: number;
}

export interface ToDoResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: ToDo[];
}