import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { QuestionService } from '../Services/question.service'
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  form: FormGroup;

  constructor(public questionService:QuestionService) { }

  ngOnInit() {

    this.form = new FormGroup({
      question: new FormControl(null,{validators:[Validators.required]
      }),
      option1: new FormControl(null,{validators:[Validators.required]
      }),
      option2: new FormControl(null,{validators:[Validators.required]
      }),
      option3: new FormControl(null,{validators:[Validators.required]
      }),
      option4: new FormControl(null,{validators:[Validators.required]
      }),
      correctAns: new FormControl(null,{validators:[Validators.required]
      }),
    
    });


  }

  onSaveQuestion(){
    const questionData={
      question:this.form.controls.question.value,
      option1:this.form.controls.option1.value,
      option2:this.form.controls.option2.value,
      option3:this.form.controls.option3.value,
      option4:this.form.controls.option4.value,
      correctAns:this.form.controls.correctAns.value
    }

    console.log(questionData);
    this.questionService.addQuestionData(questionData);
  }
}
