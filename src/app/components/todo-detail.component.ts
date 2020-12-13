import { HttpClient } from '@angular/common/http';
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
  nextSubtaskId: number
  todoDetail: any
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.todoId = this.activatedRoute.snapshot.params['todoId']
    this.http.get(`http://localhost:3000/task/${this.todoId}`)
      .toPromise()
      .then(result => this.todoDetail = result)
      .then(()=> {
       return this.http.get(`http://localhost:3000/nextsubtaskId`)
        .toPromise()
        
      })
      .then(res=> this.nextSubtaskId = res['nextSubtaskId'])
   
    
    //this.todoDB.getSingleToDoDetail(this.todoId)
      //.then(result => this.todoDetail = result)
      //.catch(e => console.log(e))
  }
  updateTodo() { 
    const todoFormUpdate = this.todoRef.todo
     todoFormUpdate.id = this.todoId
     console.log(todoFormUpdate)
     const formData = new FormData()
     formData.set('mainTaskTitle', todoFormUpdate.title)
     formData.set('subtasks', JSON.stringify(todoFormUpdate.tasks))
     this.todoRef.imageFile ? formData.set('imageFile', this.todoRef.imageFile.nativeElement.files[0]): null
     this.http.post(`http://localhost:3000/update/${todoFormUpdate.id}`, formData)
      .toPromise()
      .then(res => console.log(res))
      .catch(e=> console.log(e))
     //formData.set('imageFile')
   // this.todoDB.updateTodo(todoForUpdate)
  //  this.router.navigate(['/'])

  }
  deleteTodo() {
   // this.todoDB.deleteTodo(this.todoId)
    this.router.navigate(['/'])
    
  }
}
