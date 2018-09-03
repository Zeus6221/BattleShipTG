import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private angularFireAuth:AngularFireAuth, private router:Router) { 
    this.isLogged();
  }

  login(user: User){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    var elemets = JSON.stringify(user);

    this.angularFireAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    .then(
      response=>{
                  console.log(response);
                  this.router.navigate(["home"]);

    })
    .catch(error=>{console.log(error);});
  }

  public isLogged(){
    return this.angularFireAuth.authState;
  }

  public logout(){
    this.angularFireAuth.auth.signOut();
  }

}
