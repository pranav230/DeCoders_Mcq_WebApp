import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";


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
  public questionScreen:any;
  public questionSub : Subscription;
  public i =0;
  public flag =1;
  public answers:any[] = [];
  public score:number=0;
  constructor(public questionService:QuestionService,public loginService:LoginService,public router:Router,public activeRoute:ActivatedRoute) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      option: new FormControl(null,{validators:[Validators.required]
      }),

    });


    this.questionService.getQuestion()
    this.questionSub = this.questionService.getQuestionUpdateListener().subscribe((questionDetails:[])=>{
      this.questions = questionDetails;
      this.questionScreen = this.questions[this.i];

      this.activeRoute.params.subscribe((params)=>{
        console.log("param route",this.questions);
        
           this.timer();
        
      })
    });
  }


  unanswerQuestion(questionID:string){
    console.log(questionID,this.i);
      
        this.form.controls.option.reset(this.answers[this.i].ans);
        this.form.controls.option.reset(null);

  }
  getNextQuestion(questionID:string){

      // console.log("answer1",this.answers[0]);
       this.i++;
      // console.log("answer2",this.answers[index],this.i);
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

      if(this.answers[this.i])
      {
        this.form.controls.option.reset(this.answers[this.i].ans);
      }else{
        this.form.controls.option.reset(null);

      }
      
        console.log("qwerty",this.answers);
  }



  calculateScore(){
    var testSub = confirm("Are you sure you want to submit your test");
    if(testSub==false)
        return;
    console.log("calc func",this.questions)
      this.questions.forEach(element => {
          this.answers.forEach(el => {
              if(element._id === el.ansID)
              {
                if(element.correctAns == el.ans)
                {
                  this.score +=4;
                }
                else if(el.ans == null){
                  this.score +=0;
                }
                else{
                  this.score -=1;
                }
              }
          });
      });
      console.log("Score",this.score);
      this.loginService.updateScore(this.score);
      // this.router.navigate(['/result']);
  }

  getPreviousQuestion(){
    this.i--;
    if(this.i == -1)
    {
      this.i = this.questions.length-1;
    }
    this.questionScreen = this.questions[this.i];

    if(this.answers[this.i])
      {
        this.form.controls.option.reset(this.answers[this.i].ans);
      }else{
        this.form.controls.option.reset(null);

      }
   
  }

  timer(){
    console.log("in timer function1",this.questions);
    
    //duration of test in minutes
    //added 0.2 for processing delay correction
    var durationOfTest = 30 + 0.02;
  
    var countDownTime = new Date().getTime() + durationOfTest*60*1000;
    var questionInfo = this.questions;
    var answerInfo = this.answers;
    var score = 0;
    var logService = this.loginService;
    var router = this.router;
    
    // Update the count down every 1 second
    var x = setInterval(function() {
      // console.log("in timer function2",questionInfo);
      //console.log("222",questionInfo);
      
      var now = new Date().getTime();
  
      //time left for the timer to terminate
      var timeLeft = countDownTime - now;

      var min = Math.floor((timeLeft % (1000*60*60)) / (1000*60));
      var sec = Math.floor((timeLeft % (1000*60)) / 1000);
      
      if(document.location.href === "http://localhost:4200/home"){
        document.getElementById("timer_content").innerHTML = min + ":" + sec.toString().padStart(2,"0");
      }
      
      // If the count down is finished, write some text
      if (timeLeft < 0) {
        clearInterval(x);
        document.getElementById("timer_content").innerHTML = "Finished";
        // document.getElementById("time_left").innerHTML = "EXPIRED";  
          questionInfo.forEach(element => {
            answerInfo.forEach(el => {
                if(element._id === el.ansID)
                {
                  if(element.correctAns == el.ans)
                  {
                    score +=4;
                  }
                  else if(el.ans == null){
                    score +=0;
                  }
                  else{
                    score -=1;
                  }
                }
            });
        });
        console.log("Score",score);
        logService.updateScore(score);
        router.navigate(['/result']);
      }
    }, 1000,questionInfo,answerInfo,logService,score,router);
 
    // alert("test finised")
    // console.log("333",this.questions);

  }
}
