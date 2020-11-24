//auto assignment of values after defining the first one
export enum Priority{
    Low, Medium, High
}

export interface Task{
    description: string;
    priority: Priority
}

export interface Todo{
    id: string,
    title: string, 
    tasks: Task[]
}

export interface TodoSummary {
    id: string;
    title:string;
}