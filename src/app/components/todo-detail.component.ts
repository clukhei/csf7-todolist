import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from './models';
import { TodoDatabase } from './todo.database';
@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todoId: string = ''
  todoDetail: Todo
  constructor(private activatedRoute: ActivatedRoute, private todoDB: TodoDatabase) { }

  ngOnInit(): void {
    this.todoId = this.activatedRoute.snapshot.params['todoId']
    this.todoDB.getSingleToDoDetail(this.todoId)
      .then(result => this.todoDetail = result)
      .catch(e => console.log(e))
  }

}
