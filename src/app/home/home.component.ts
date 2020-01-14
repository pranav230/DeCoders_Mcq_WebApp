import { Component, OnInit } from '@angular/core';
import {QuestionService } from '../Services/question.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public questions:any[] = [];
  private questionScreen:any;
  private questionSub : Subscription;
  public i =0;
  constructor(public questionService:QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestion()
    this.questionSub = this.questionService.getQuestionUpdateListener().subscribe((questionDetails:[])=>{
      this.questions = questionDetails;
      this.questionScreen = this.questions[this.i];
    })
  }
  getNextQuestion(){
       this.i++;
       if(this.i==this.questions.length)
      {
        this.i=0;
      }
      this.questionScreen = this.questions[this.i];
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
