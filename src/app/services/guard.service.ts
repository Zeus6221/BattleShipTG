import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  loggedIn = false;
  constructor(private loginService: LoginService) {
    loginService.isLogged().subscribe(result => {
      if (result && result.uid) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }

    },
      error => {
        this.loggedIn = false;
      }
    )
  }

  canActivate(){
    return this.loggedIn;
  }
}
