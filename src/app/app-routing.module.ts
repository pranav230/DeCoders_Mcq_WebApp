import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'questions',component:AddQuestionComponent
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'rules',component:RulesComponent
  },
  {
    path:'result',component:ResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
