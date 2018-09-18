import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = <User>{};

  constructor(
    private loginUser: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginUser.login(this.user);
  }

  loginWithFacebook() {
    this.loginUser
      .facebookLogin();      
  }

}
