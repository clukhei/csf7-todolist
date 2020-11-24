import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from './models';
import { TodoComponent } from './todo.component';
import { TodoDatabase } from './todo.database';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  @ViewChild('myTodo')
  todoRef: TodoComponent
  todoId: string = ''
  todoDetail: Todo
  constructor(private activatedRoute: ActivatedRoute, private todoDB: TodoDatabase, private router: Router) { }

  ngOnInit(): void {
    this.todoId = this.activatedRoute.snapshot.params['todoId']
    this.todoDB.getSingleToDoDetail(this.todoId)
      .then(result => this.todoDetail = result)
      .catch(e => console.log(e))
  }
  updateTodo() { 
    const todoForUpdate = this.todoRef.todo
     todoForUpdate.id = this.todoId
    this.todoDB.updateTodo(todoForUpdate)
    this.router.navigate(['/'])

  }
  deleteTodo() {
    this.todoDB.deleteTodo(this.todoId)
    this.router.navigate(['/'])
    
  }
}
