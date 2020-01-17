import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import {QuestionService } from '../Services/question.service'
import {LoginService } from '../Services/login.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  public questions:any[] = [];
  private questionScreen:any;
  private questionSub : Subscription;
  public i =0;
  public flag =1;
  public answers:any[] = [];
  public score:number=0;
  constructor(public questionService:QuestionService,public loginService:LoginService) { }

  ngOnInit() {

    this.form = new FormGroup({
      option: new FormControl(null,{validators:[Validators.required]
      }),

    });


    this.questionService.getQuestion()
    this.questionSub = this.questionService.getQuestionUpdateListener().subscribe((questionDetails:[])=>{
      this.questions = questionDetails;
      this.questionScreen = this.questions[this.i];
    })
  }
  getNextQuestion(questionID:string){
       this.i++;
       if(this.i==this.questions.length)
        {
          this.i=0;
        }
       this.questionScreen = this.questions[this.i];
        const answer ={
          ansID:questionID,
          ans:this.form.controls.option.value
        }
      console.log(answer);
      if(!this.answers.length)
          this.answers.push(answer);

      this.answers.forEach(element => {
        if(this.flag)
        {
          if(element.ansID==questionID)
          {
           element.ans=this.form.controls.option.value;
           this.flag = 0;
          }
        }
      });
      if(this.flag)
      {
        this.answers.push(answer);
      }else{
        this.flag=1;
      }
       
      console.log(this.answers);
  }

  calculateScore(){
      this.questions.forEach(element => {
          this.answers.forEach(el => {
              if(element._id === el.ansID)
              {
                if(element.correctAns == el.ans)
                {
                  this.score +=4;
                }
                else{
                  this.score -=1;
                }
              }
          });
      });
      console.log("Score",this.score);
      this.loginService.updateScore(this.score);
  }

  getPreviousQuestion(){
    this.i--;
    if(this.i == -1)
    {
      this.i = this.questions.length-1;
    }
    this.questionScreen = this.questions[this.i];
   
  }
}
