import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Login } from 'src/app/Models/login';
import { FormControl, FormGroup, RequiredValidator, MinLengthValidator } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm = new FormGroup({
    Email: new FormControl(''),
    Password: new FormControl('')
  });
  constructor(private loginService: LoginService, private route: Router) { }


  ngOnInit(): void {
  }
  goRegister() {
    this.route.navigate(["./newUser"])
  }
  onSubmit() {
    let login = new Login()
    login.password = this.loginForm.controls.Password.value,
      login.email = this.loginForm.controls.Email.value

    this.message = "הבקשה נשלחת...";
    this.loginService.checkUser(login).subscribe(
      success => {
        debugger
        this.message = "!זיהוי הצליח"
        sessionStorage.setItem("currentPatient", success.id.toString())
        // this.router.navigate(['/locations'])
      },
      error => { console.log(error), this.message = error.error.message }
    )
  }
}