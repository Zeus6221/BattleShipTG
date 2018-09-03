import { Component, OnInit } from '@angular/core';
import { DelegateService } from '../services/delegate.service';

import { Game } from '../interfaces/game';
import { FireTarget } from '../interfaces/fire-target';
import { ContentCell } from '../enumerations/content-cell.enum';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { InitGame } from '../interfaces/init-game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  currentGame: Game = <Game>{
    LeftBoard: {},
    RightBoard: {}
  };
  firstLoad = true;
  idUser = "";
  currentFire: FireTarget = <FireTarget>{};

  colors = ["black", "transparent", "green", "white", "red"];
  idGame = "";
  constructor(private delegate: DelegateService, private login: LoginService, private route: ActivatedRoute) {

    this.idGame = route.snapshot.params['id'];
    if (this.idUser == "") {
      login.isLogged()
        .subscribe(
          result => {
            this.idUser = result.uid;
            if (this.firstLoad) {
              this.loadBoard();
              this.firstLoad = false;
            }
          }
        );
    }

    delegate.getFire(this.idGame).subscribe(
      result => {
        if (result) {
          this.currentFire = <FireTarget>result;
          if (this.currentFire.Side == "LeftBoard") {
            (this.currentGame.LeftBoard.Positions[this.currentFire.Row])[this.currentFire.Column] = this.currentFire;
          }
          else {
            (this.currentGame.RightBoard.Positions[this.currentFire.Row])[this.currentFire.Column] = this.currentFire;
          }
          console.log("current fire");
          console.log(this.currentFire);
        }
      }
    );
  }

  loadBoard() {
    console.log("user id");
    console.log(this.idUser);
    var init: InitGame = {
      IdGame: this.idGame,
      PlayerId: this.idUser,
      Size: 10
    };
    this.delegate.createOrFind(init).subscribe(
      result => {
        if (result) {
          console.log("para cargar");
          console.log(this.currentGame);
          this.currentGame = result;
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

  fireTorpedo(e) {

    if (this.currentFire.PlayerId == this.idUser) {
      alert("no es tu turno aun");
    }
    else {
      var controlId = e.target.id;
      var row = controlId.split("*")[0];
      var column = controlId.split("*")[1];
      var originBoard = controlId.split("*")[2];
      var idGame = controlId.split("*")[3];
      var shoot: FireTarget =
      {
        Column: column,
        Row: row,
        Content: ContentCell.SuccessImpact,
        Id: idGame,
        Side: originBoard,
        PlayerId: this.idUser
      }

      this.delegate.fire(shoot)
        .subscribe(
          response => {
            console.log(response.Side);
          },
          error => {
            console.log("error en disparo");
            console.log(error);
          }
        );
    }
  }
}
