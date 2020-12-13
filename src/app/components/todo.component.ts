import { VariableAst } from '@angular/compiler';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Todo } from './models'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @ViewChild('imageFile') imageFile: ElementRef
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
   
    return this.fb.group({
      title: this.fb.control('', [Validators.required]),
      tasks: this.fb.array([]),  //this.taskArray
      imageFile: this.fb.control('')
    })
  }


  private createTask(): FormGroup {
    console.log(this.subtaskId)
    return this.fb.group({
      subtaskId: this.fb.control(this.subtaskId),
      subtaskTitle: this.fb.control(''),
      subtaskStatus: this.fb.control(0)
    })
  }

  addTask() {
    this.subtaskId++
    const task = this.createTask()
    this.tasksArray.push(task)
  }
  showValues() {
    console.log(this.toDoForm.value)
  }

  delete(i: number) {

    this.tasksArray.removeAt(i)

  }
  nextsubId: number

  @Input() set subtaskId(id){
    this.nextsubId = id
  } 
  get subtaskId(){
    return this.nextsubId
  }
  get todo() {
    return this.toDoForm.value
  }


  @Input() set todo(t) {
    
    if (t) {
      t.forEach(task => {
        const eachTask = this.fb.group({
          subtaskId: this.fb.control(task.subtaskId),
          subtaskTitle: this.fb.control(task.subtaskTitle),
          subtaskStatus: this.fb.control(task.subtaskStatus)
        })
        return this.tasksArray.push(eachTask)
      })

      this.toDoForm = this.fb.group({
        title: this.fb.control(t[0].mainTaskTitle),
        tasks: this.tasksArray,
        imageFile: this.fb.control("")
      })

    }


  }

}
