import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private angularFireAuth: AngularFireAuth, private router: Router,
    private userService: UserService) {
    this.isLogged();
  }

  login(user: User) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    var elemets = JSON.stringify(user);

    this.angularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(
        response => {  
            var pos = user.email.indexOf("@");
            var nick = user.email.substr(0, pos);
            user.id = response.user.uid;
            user.nick = nick;
            this.userService
              .addUser(user)
              .then(()=>{
                this.router.navigate(["home"]);}
                )
              .catch(
                error => {
                  console.log(error);
                }
              );          
        })
      .catch(error => { console.log(error); });
  }

  public isLogged() {
    return this.angularFireAuth.authState;
  }

  public logout() {
    this.angularFireAuth.auth.signOut();
  }

  public facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then(
        response => {
          if (response.additionalUserInfo.isNewUser) {
            const userLogged: User =
            {
              email: response.user.email,
              password: "",
              nick: response.user.displayName,
              id: response.user.uid,
              pictureUrl: ""
            }
            this.userService
              .addUser(userLogged)
              .then(()=>{this.router.navigate(["home"]);})
              .catch(
                error => {
                  console.log(error);
                }
              );
          }
          this.router.navigate(["home"]);
        })
      .catch(
        error => {
          console.log(error);
        }
      );;
  }
}
