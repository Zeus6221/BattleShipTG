import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = <User>{};

  constructor(private registerUser: RegisterService) { }

  ngOnInit() {
  }

  register() {
    this.registerUser.register(this.user);
  }
}
