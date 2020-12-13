import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDatabase } from './todo.database';
import {Todo, TodoSummary} from './models'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  todos : TodoSummary[] =[]

  
 ngOnInit(): void {
    this.http.get(`http://localhost:3000/alltasks`)
      .toPromise()
      .then(res=> {
        for (const [key, value] of Object.entries(res)){
          const obj = {}
          obj['title'] = key
          obj['id'] = value[0].id
          obj['image'] = value[0].maintask_img
          const subtasksArr = value.map(st=> {
            const subtaskTitle = st.subtask_title
             const subtaskStatus = st.substask_status
             return {subtaskTitle, subtaskStatus}
           })
           obj['subtasks'] = subtasksArr
          this.todos.push(obj as TodoSummary)
         
        }
      
       
      }).then(()=> console.log(this.todos))
      .catch(e => console.log(e))
  }
 async goToDetails(id: string){

    this.router.navigate(['/todo', id])
  }

}
