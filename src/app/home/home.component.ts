import { Component, OnInit } from '@angular/core';
import { DelegateService } from '../services/delegate.service';
import { InitGame } from '../interfaces/init-game';
import { LoginService } from '../services/login.service';
import { ActualGame } from '../interfaces/actual-game';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  availableGames: any;
  title: string;
  loggedUser: User = <User>{};

  constructor(private delegate: DelegateService,
    private login: LoginService,
    private router: Router,
    private userService: UserService) {      
    if (!this.loggedUser.id) {
      login.isLogged()
        .subscribe(
          result => {
            userService.getUser(result.uid)
            .subscribe(result => {
              this.loggedUser = <User>result;
              this.getAvailableGames();
            });
          }
        );
    }
    else{
      this.getAvailableGames();
    }
  }

  getAvailableGames() {
    this.delegate.getAvailableGames().subscribe(
      response => {
        if (response) {
          var list = <ActualGame[]>response;
          console.log(this.loggedUser);
          list = list.filter(game => game.LeftPlayerId == "" && game.RightPlayerId != this.loggedUser.id);
          this.availableGames = list;
        }
      }
    );
  }

  createNewGame() {

    var idGame = Date.now().toString();
    var init: InitGame = {
      IdGame: idGame,
      PlayerId: this.loggedUser.id,
      TitleGame: this.title,
      Size: 10
    };

    this.delegate.createOrFind(init).subscribe(
      result => {
        if (result) {          
          console.log("para cargar");
          console.log(result);
          this.router.navigate(['/game/' + result.Id]);
        }
      },
      error => {
        console.log("error desde la carga");
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

}
