import { Component, OnInit } from '@angular/core';
import { DelegateService } from '../services/delegate.service';
import { Game } from '../interfaces/game';
import { FireTarget } from '../interfaces/fire-target';
import { ContentCell } from '../enumerations/content-cell.enum';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { InitGame } from '../interfaces/init-game';
import { ActualGame } from '../interfaces/actual-game';
import { trigger, state, style, transition, animate } from "@angular/animations"

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('final => inicial', animate(2000)),
      transition('inicial => final', animate(2000))
    ])
  ]
})
export class GameComponent implements OnInit {

  state = 'inicial';
  currentGame: Game = <Game>{
    LeftBoard: {},
    RightBoard: {}
  };

  fireloaded = false;
  firstLoad = true;
  idUser = "";
  currentFire: FireTarget = <FireTarget>{};
  actualGame: any;
  canPlay: boolean = false;
  colors = ["black", "transparent", "green", "#00ffff", "red"];
  idGame = "";
  side: string = "";

  constructor(private delegate: DelegateService, private login: LoginService, private route: ActivatedRoute) {
    this.idGame = route.snapshot.params['id'];
    this.loadUser();
  }

  loadUser() {
    if (this.idUser == "") {
      this.login.isLogged()
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
  }

  loadBoard() {
    var init: InitGame = {
      IdGame: this.idGame,
      PlayerId: this.idUser,
      TitleGame: "",
      Size: 10
    };
    this.delegate.createOrFind(init).subscribe(
      result => {
        if (result) {
          this.currentGame = result;
          this.loadFire();
          this.loadActualGame();
        }
      },
      error => {
        console.log("error desde la carga");
        console.log(error);
      }
    );
  }

  loadActualGame() {
    console.log("user id");
    console.log(this.idUser);
    this.delegate.getActualGame(this.idGame).subscribe(
      response => {
        var actual = <ActualGame>response;
        if (actual.RightPlayerId != this.idUser) {
          actual.LeftPlayerId = this.idUser;
          this.side = 'LeftBoard';
          this.delegate.updateActualGame(actual).subscribe(
            error => { console.log(error); }
          );
        }
        else {
          this.side = "RightBoard";
        }
      }
    );
  }

  loadFire() {
    this.delegate.getFire(this.idGame).subscribe(
      result => {
        if (result) {
          this.currentFire = <FireTarget>result;
          if (this.currentFire.Side == "LeftBoard") {
            (this.currentGame.LeftBoard.Positions[this.currentFire.Row])[this.currentFire.Column] = this.currentFire;
          }
          else {
            (this.currentGame.RightBoard.Positions[this.currentFire.Row])[this.currentFire.Column] = this.currentFire;
          }
          this.fireloaded = true;
          this.canPlay = this.currentFire.PlayerId != this.idUser;
        }
      }
    );
  }

  ngOnInit() {
  }

  animar() {
    this.state = this.state == 'final' ? 'inicial' : 'final';
  }

  fireTorpedo(e) {
    if (this.canPlay) {

      var controlId = e.target.id;
      var dataFire = controlId.split("*");

      var shoot: FireTarget =
      {
        Column: dataFire[1],
        Row: dataFire[0],
        Content: ContentCell.SuccessImpact,
        Id: dataFire[3],
        Side: dataFire[2],
        PlayerId: this.idUser
      }

      if (shoot.Side != this.side) {
        this.animar();
      }
      else {
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
}
