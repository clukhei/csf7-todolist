import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDatabase } from './todo.database';
import {Todo, TodoSummary} from './models'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private todoDB: TodoDatabase) { }

  todos: TodoSummary[] = []
 
  
 ngOnInit(): void {
  this.todoDB.getTodoSummary()
    .then(result=> {
      console.log(result)
      this.todos = result
    })
  }
 async goToDetails(id: string){

    this.router.navigate(['/todo', id])
  }

}
