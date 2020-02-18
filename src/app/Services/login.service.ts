import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public teamID:string;
  constructor(private http:HttpClient,private router:Router) { }

  public ip:string = "http://127.0.0.1";
  addTeamData(teamData:any){
    console.log(teamData)
    // this.http.post<{message:string,teamID:string}>("http://localhost:1025/teamInfo",teamData).subscribe(responseData =>{
      this.http.post<{message:string,teamID:string}>(this.ip + ":1025/teamInfo",teamData).subscribe(responseData =>{

    console.log(responseData)
      console.log("response team info",responseData);
      if(responseData["message"] == "success")
      {
          localStorage.setItem("teamID",responseData.teamID);
      }
    })
  }

  updateScore(Score:any){
    this.teamID = localStorage.getItem("teamID");
    console.log("Service score",Score,this.teamID);
    const scoreInfo:any ={
      teamID:this.teamID,
      score:Score
    }
    
    this.http.put(this.ip +":1025/teamInfo",scoreInfo).subscribe(responseData =>{
     console.log("updated score",responseData);
     if(responseData["message"]=="success")
     {
        this.router.navigate(['/result']);
     }
    })
  }


  

}
