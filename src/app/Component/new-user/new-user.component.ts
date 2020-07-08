import { Component, OnInit, Input } from '@angular/core';
import { NewUser } from 'src/app/Models/newUser';
import { NewUserService } from 'src/app/Services/new-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  // @Input("my-newUser") newUserInput:NewUser;

  constructor(private loginService: NewUserService, private route: Router) { }
  email: string = "";
  password: string = "";
  lastName: string = "";
  firstName: string = "";
  height: number = 0;
  weight: number = 0;
  mbi: number = 0;

  ngOnInit(): void {
  }
  newUser() {
    let newUser = new NewUser();
    newUser.email = this.email;
    newUser.password = this.password;
    newUser.firstName = this.firstName;
    newUser.lastName = this.lastName;
    newUser.height = this.height;
    newUser.weight = this.weight;

    this.loginService.addUserToDB(newUser).subscribe(
      myD => {
        if (myD == false) {
          alert("Register failed,probably this email already exist, try another")
        }
        //  this.loginService.setLocalUser(this.email, this.password, this.firstName, this.lastName, this.height, this.weight);
        alert(" you added succesfuly!!! please press conect");
         sessionStorage.setItem("NewUser", newUser.email);
        this.route.navigate(["./card"])
      },
      myE => { alert(myE.message) }
    );
  }
}
