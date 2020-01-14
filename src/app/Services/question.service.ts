import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsUpdated = new Subject<any>();
  private questions:any[] = [];


  constructor(private http:HttpClient,private router:Router) { }

  addQuestionData(questionData:any){
    console.log(questionData)
    this.http.post("http://localhost:1025/question",questionData).subscribe(responseData =>{
      console.log(responseData);
      if(responseData["message"] = "success")
      {
          alert("QUESTION ADDED SUCCESSFULLY");
      }
    })
  }

  getQuestion(){
    console.log("service start ");

        this.http.get<{message:string,question:any}>("http://localhost:1025/question").subscribe(questionDetails => {
        // this.product = productDetails.product 
        // this.productdetailsUpdated.next(this.product);
        this.questions = questionDetails["data"];
        this.questionsUpdated.next([...this.questions])
        console.log("service ",this.questions);
        })
          
  }

  getQuestionUpdateListener(){
    return this.questionsUpdated.asObservable();
  }

}
