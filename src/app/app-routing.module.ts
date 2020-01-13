import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddQuestionComponent } from './add-question/add-question.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'questions',component:AddQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
