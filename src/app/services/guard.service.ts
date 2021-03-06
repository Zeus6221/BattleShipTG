import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  loggedIn = false;
  
  constructor(private loginService: LoginService) {
    loginService.isLogged().subscribe(
      result => {
        let evaluation: boolean = (result != undefined && result.uid != "");        
        this.loggedIn = evaluation;
      },
      error => {
        this.loggedIn = false;
      }
    )
  }

  canActivate():boolean {    
    return this.loggedIn;
  }
}
