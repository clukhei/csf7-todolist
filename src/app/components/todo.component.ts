import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Todo } from './models'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  toDoForm: FormGroup
  tasksArray: FormArray
  constructor(private fb: FormBuilder) { }



  ngOnInit(): void {
    this.toDoForm = this.createToDo()
    //assigning taskArray name to the FormArray created in line 18
    this.tasksArray = this.toDoForm.get('tasks') as FormArray
  }

  //return the whole form
  private createToDo(): FormGroup {
    // this.tasksArray = this.fb.array([])
    return this.fb.group({
      title: this.fb.control('', [Validators.required]),
      tasks: this.fb.array([])  //this.taskArray
    })
  }
  /*  private createTask(){
       const taskGroup =  this.fb.group({
         description: this.fb.control(''),
         quantity: this.fb.control(0)
       })
       this.tasksArray.push(taskGroup)
   } */

  private createTask(): FormGroup {
    return this.fb.group({
      description: this.fb.control(''),
      priority: this.fb.control(0)
    })
  }

  addTask() {
    const task = this.createTask()
    this.tasksArray.push(task)
  }
  showValues() {
    console.log(this.toDoForm.value)
  }

  delete(i: number) {
 
    this.tasksArray.removeAt(i)

  }

  get todo(): Todo {

    return this.toDoForm.value as Todo
  }


  @Input() set todo(t: Todo) {
    //leave it
    if (t) {
      t.tasks.forEach(task => {
        const eachTask = this.fb.group({
          description: this.fb.control(task.description),
          priority: this.fb.control(task.priority)
        })
        return this.tasksArray.push(eachTask)
      })

      this.toDoForm = this.fb.group({
        title: this.fb.control(t.title),
        tasks: this.tasksArray
      })

    }


  }

  ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  dataSource = this.ELEMENT_DATA
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}
