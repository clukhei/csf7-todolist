import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoDatabase } from './todo.database';
import { v4 as uuidv4 } from 'uuid';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('myTodo') //name of template reference without the hash
  todoRef: TodoComponent
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  async addToDo() {
    
  
    const todoForm = this.todoRef.toDoForm
    console.log(todoForm.get('tasks').value)
    const formData = new FormData()
    formData.set('mainTaskTitle',todoForm.get('title').value)
    formData.set('subtasks', JSON.stringify(todoForm.get('tasks').value))
    console.log(this.todoRef.imageFile)
    formData.set('imageFile', this.todoRef.imageFile.nativeElement.files[0])
    console.log(formData.get('imageFile'))
    this.http.post(`http://localhost:3000/insert`, formData)
      .toPromise()
      .then(res=> console.log(res))
      .catch(e=> console.log(e))

      this.router.navigate(['/'])
  }
  
}
