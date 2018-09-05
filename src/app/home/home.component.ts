import { Component, OnInit } from '@angular/core';
import { DelegateService } from '../services/delegate.service';
import { InitGame } from '../interfaces/init-game';
import { LoginService } from '../services/login.service';
import { ActualGame } from '../interfaces/actual-game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  availableGames: any;
  title: string;
  idUser = "";

  constructor(private delegate: DelegateService, private login: LoginService, private router: Router) {

    if (this.idUser == "") {
      login.isLogged()
        .subscribe(
          result => {
            this.idUser = result.uid;
          }
        );
    }
    this.getAvailableGames();
  }

  getAvailableGames() {
    this.delegate.getAvailableGames().subscribe(
      response => {
        if (response) {
          var list = <ActualGame[]>response;
          console.log(list);
          list = list.filter(game => game.LeftPlayerId == "");
          this.availableGames = list;
        }
      }
    );
  }

  createNewGame() {

    var idGame = Date.now().toString();
    var init: InitGame = {
      IdGame: idGame,
      PlayerId: this.idUser,
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
