import Dexie from 'dexie';
import { Todo, TodoSummary } from './models';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoDatabase extends Dexie {
    private todo: Dexie.Table<Todo, string>
    constructor() {
        //database name
        super('tododb')
        //setup schema for v1
        this.version(1).stores({
            //collection name
            todo: "id"
        })

        //get a reference to the todocollection
        this.todo = this.table('todo')
    }

    async addTodo(t: Todo): Promise<any> {
        //put is an upsert vs add is insert only
        return await this.todo.put(t)
    }

    // async getTodoSummary(): Promise<TodoSummary[]> {
    //     return (await this.todo.toArray())
    //         .map(d => {
    //             return {
    //                 id: d.id,
    //                 title: d.title
    //             } as TodoSummary
    //         })
            
    // }
    async getSingleToDoDetail (id:string): Promise<Todo> {
        return await this.todo.get(id)
    }
    async deleteTodo(id:string): Promise<any> {
        return await this.todo.where('id').equals(id).delete()
    }

    async updateTodo(t: Todo): Promise<any>{
        return await this.todo.where('id').equals(t.id).modify(t)
    }
}