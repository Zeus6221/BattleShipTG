import { Component, OnInit } from '@angular/core';
import { DelegateService } from '../services/delegate.service';
import { Game } from '../interfaces/game';
import { FireTarget } from '../interfaces/fire-target';
import { ContentCell } from '../enumerations/content-cell.enum';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { InitGame } from '../interfaces/init-game';
import { ActualGame } from '../interfaces/actual-game';
import { ToastrService } from 'ngx-toastr';
import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../interfaces/conversation';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

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

  fireloaded = false;
  firstLoad = true;  
  currentFire: FireTarget = <FireTarget>{};
  actualGame: ActualGame;
  canPlay: boolean = false;

  shipQuarter:string = "#00F12F";
  fail:string = "#F10032";
  success:string = "#F1B500";
  colors = ["black", "transparent", this.shipQuarter, this.success, this.fail];
  idGame = "";
  side: string = "";
  conversationId: string = "";
  gameChatMessage: string = "";  
  messages: Array<Conversation> = new Array<Conversation>();
  loggedUser: User = <User>{};

  constructor(
    private conversation: ConversationService,
    private delegate: DelegateService,
    private login: LoginService,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService) {

    const mess: Conversation = {
      Id: "",
      Sender: "",
      Text: "",
      Timestamp: Date.now()
    };
    
    this.messages.push(mess);
    this.idGame = route.snapshot.params['id'];           
    this.loadUser();
  }

  loadUser() {
    if (!this.loggedUser.id) {
      this.login.isLogged()
        .subscribe(
          result => {
            this.userService
              .getUser(result.uid)
              .subscribe(
                result => {
                  this.loggedUser = <User>result;
                }
              );

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
      PlayerId: this.loggedUser.id,
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
    this.delegate
      .getActualGame(this.idGame)
      .subscribe(
        response => {
          this.actualGame = <ActualGame>response;
          const ids = [this.actualGame.RightPlayerId, this.actualGame.LeftPlayerId].sort();
          this.conversationId = ids.join();
          this.SetOpositPlayer();
        });
  }

  SetOpositPlayer() {
    if (this.actualGame && this.actualGame.RightPlayerId != this.loggedUser.id) {
      this.actualGame.LeftPlayerId = this.loggedUser.id;
      this.side = 'LeftBoard';
      this.delegate.updateActualGame(this.actualGame).subscribe(error => { console.log(error); });
    }
    else if (this.actualGame) {
      this.side = "RightBoard";
    }
    this.getConversations();
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
          this.canPlay = this.currentFire.PlayerId != this.loggedUser.id;
        }
      }
    );
  }

  ngOnInit() {
  }

  validateShoot(shoot: FireTarget): boolean {

    var result = true;
    if (!this.canPlay) {
      this.toastr.warning('Paciencia, es el turno de tu oponente, crucemos los dedos para que no te atrape :)');
      result = false;
    }
    if (shoot.Side != this.side) {
      this.toastr.warning('Estos son tus propios barcos, el fuego amigo no es permitido ;)');
      result = false;
    }
    return result;
  }

  fireTorpedo(e) {
    var controlId = e.target.id;
    var dataFire = controlId.split("*");
    this.sendMessage();
    var shoot: FireTarget =
    {
      Column: dataFire[1],
      Row: dataFire[0],
      Content: ContentCell.SuccessImpact,
      Id: dataFire[3],
      Side: dataFire[2],
      PlayerId: this.loggedUser.id
    }

    var validShoot = this.validateShoot(shoot);
    if (validShoot) {
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

  getConversations() {
    console.log(this.conversationId);
    console.log(this.loggedUser.id);
    if (this.conversationId != "") {
      this.conversation
        .getConversation(this.conversationId)
        .valueChanges()
        .subscribe(
          result => {
            this.messages = <Array<Conversation>>result;
            console.log(this.messages);
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  sendMessage() {
    if (this.conversationId == "") {
      this.delegate
        .getActualGame(this.idGame)
        .subscribe(
          response => {
            this.actualGame = <ActualGame>response;
            const ids = [this.actualGame.RightPlayerId, this.actualGame.LeftPlayerId].sort();
            this.conversationId = ids.join();
            this.createConversation();
          });
    }
    else {
      this.createConversation()
        ;
    }
  }

  createConversation() {

    const messsage: Conversation = {
      Id: this.conversationId,
      Timestamp: Date.now(),
      Text: this.gameChatMessage,
      Sender: this.loggedUser.nick
    }

    if (this.gameChatMessage != "") {
      this.conversation.createConversation(messsage).then(
        () => {
          console.log("mensaje enviado");
          this.gameChatMessage = "";
        }
      );
    }

  }
}
