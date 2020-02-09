import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {QuestionService} from "../Services/question.service"

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor(public router:Router,public questionService:QuestionService) { }

  ngOnInit() {
  }


}
