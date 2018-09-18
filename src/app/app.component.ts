import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BattleShipTG';
  loggedIn = false;
  loggedUser: User = <User>{};

  constructor(private loginService: LoginService, private userService: UserService) {
    loginService.isLogged()
      .subscribe(result => {
        if (result && result.uid!="") {
          this.loggedIn = true;
          userService.getUser(result.uid)
            .subscribe(
              result => {
                if (result) {
                  this.loggedUser = <User>result;
                }
              }
            )
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

  logout() {
    this.loginService.logout();
  }
}
