import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

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
}
