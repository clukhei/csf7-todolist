//auto assignment of values after defining the first one
export enum Priority{
    Low, Medium, High
}

export interface Task{
    subtaskTitle: string;
    subtaskStatus: number
}

export interface Todo{
    id: string,
    title: string, 
    tasks: Task[]
}

export interface TodoSummary {
    id: number;
    title:string;
    image: string;
    subtasks: Task[]
}