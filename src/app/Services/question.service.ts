import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Subject, timer } from "rxjs";
import { Router } from "@angular/router";
import {LoginService} from "./login.service"

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsUpdated = new Subject<any>();
  private questions:any[] = [];
  public score:number=0;
  public ip:string = "http://192.168.43.68";

  constructor(private http:HttpClient,private router:Router,public loginService :LoginService) { }

  addQuestionData(questionData:any){
    console.log(questionData)
    // this.http.post("http://localhost:1025/question",questionData).subscribe(responseData =>{
      this.http.post(this.ip+":1025/question",questionData).subscribe(responseData =>{

      console.log(responseData);
      if(responseData["message"] = "success")
      {
          alert("QUESTION ADDED SUCCESSFULLY");
      }
    })
  }

  getQuestion(){
    console.log("service start ");

        this.http.get<{message:string,question:any}>(this.ip+":1025/question").subscribe(questionDetails => {
        
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
