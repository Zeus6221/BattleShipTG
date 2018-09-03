import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BattleShipTG';
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

  logout()
  { 
    this.loginService.logout();
  }
}
