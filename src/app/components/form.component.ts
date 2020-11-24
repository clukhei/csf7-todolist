import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoDatabase } from './todo.database';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('myTodo') //name of template reference without the hash
    todoRef: TodoComponent
  constructor(private todoDB: TodoDatabase, private router: Router) { }

  ngOnInit(): void {
  }

  async addToDo(){
   
    const id = uuidv4().toString().substring(0,8)

    const todo = this.todoRef.todo
    todo.id = id

    await this.todoDB.addTodo(todo)
    this.router.navigate(['/'])
    console.log('add to do', this.todoRef)
   
  }
}
