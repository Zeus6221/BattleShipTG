import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = { password: "", email: "" };

  constructor(private loginUser: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginUser.login(this.user);
  }

}
