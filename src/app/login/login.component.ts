import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Router} from "@angular/router"

import {LoginService } from '../Services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(public loginService:LoginService,public router:Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      teamName: new FormControl(null,{validators:[Validators.required]
      }),
      name1: new FormControl(null,{validators:[Validators.required]
      }),
      usn1: new FormControl(null,{validators:[Validators.required]
      }),
      email1: new FormControl(null,{validators:[Validators.required]
      }),
      mobile1: new FormControl(null,{validators:[Validators.required]
      }),

      name2: new FormControl(null,{validators:[Validators.required]
      }),
      usn2: new FormControl(null,{validators:[Validators.required]
      }),
      email2: new FormControl(null,{validators:[Validators.required]
      }),
      mobile2: new FormControl(null,{validators:[Validators.required]
      }),

    });

  }
  onSaveStudentData(){

    const teamData={
      teamName:this.form.controls.teamName.value,
      name1:this.form.controls.name1.value,
      usn1:this.form.controls.usn1.value,
      email1:this.form.controls.email1.value,
      mobile1:this.form.controls.mobile1.value,
      name2:this.form.controls.name2.value,
      usn2:this.form.controls.usn2.value,
      email2:this.form.controls.email2.value,
      mobile2:this.form.controls.mobile2.value
    }


    console.log(teamData);
    this.loginService.addTeamData(teamData);
    this.router.navigate(['/rules']);

  }


}
