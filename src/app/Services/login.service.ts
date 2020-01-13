import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,private router:Router) { }

  addTeamData(teamData:any){
    console.log(teamData)
    this.http.post("http://localhost:1025/teamInfo",teamData).subscribe(responseData =>{
      console.log(responseData);
      if(responseData["message"] = "success")
      {
          alert("LOGIN SUCCESSFUL")
      }
    })
  }
}
