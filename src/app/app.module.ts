import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { FormComponent } from './components/form.component';
import { TodoComponent } from './components/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoDatabase } from './components/todo.database';
import { TodoDetailComponent } from './components/todo-detail.component';
import { HttpClientModule } from '@angular/common/http';


const ROUTES : Routes = [
  {path:'', component: MainComponent},
  {path:'form', component: FormComponent},
  {path:'todo/:todoId', component: TodoDetailComponent},
  {path:'**', redirectTo:'/', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormComponent,
    TodoComponent,
    TodoDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [TodoDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
