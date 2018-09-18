import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService) { }

  register(user: User) {
   
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    var elemets = JSON.stringify(user);
    this.http.post("/api/Register", user, { headers: headers })
      .subscribe(result => {        
        if(result){
          var pos = user.email.indexOf("@");
          var nick = user.email.substr(0, pos);
          user.nick = nick;
          user.id = (<User>result).id;                                    
          this.loginService.login(user);
        }
      }
      );
  }
}
