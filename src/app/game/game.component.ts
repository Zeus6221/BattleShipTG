import { Component, OnInit } from '@angular/core';
import { Player } from '../interfaces/player';
import { ImpactStatus } from '../enumerations/impact-status.enum';
import { Board } from '../interfaces/board';
import { DelegateService } from '../services/delegate.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playerOne: Player = <Player>{};
  playerTwo: Player = <Player>{};

  constructor(private delegate:DelegateService) {
    this.playerOne.ownBoard = <Board>{};
    this.playerOne.opositBoard = <Board>{};
    this.playerOne.ownBoard.positions = new Array<Array<ImpactStatus>>();
    this.playerOne.opositBoard.positions = new Array<Array<ImpactStatus>>();
    this.createBoard();
  }

  ngOnInit() {
  }

  createBoard() {

    for (let row = 0; row < 10; row++) {
      this.playerOne.ownBoard.positions[row] = new Array<ImpactStatus>();
      this.playerOne.opositBoard.positions[row] = new Array<ImpactStatus>();
      for (let column = 0; column < 10; column++) {
        this.playerOne.ownBoard.positions[row].push(ImpactStatus.Defalutl);
        this.playerOne.opositBoard.positions[row].push(ImpactStatus.Defalutl);
      }
    }
  }

  fireTorpedo(e) {
    console.log(e);
    var controlId = e.target.id;
    var row = controlId.split("-")[0];
    var column = controlId.split("-")[1];
    var originBoard = controlId.split("-")[2];
    if(originBoard == "ownBoard"){
      (this.playerOne.ownBoard.positions[row])[column] = ImpactStatus.Impacted;
    }
    else{
      (this.playerOne.opositBoard.positions[row])[column] = ImpactStatus.Impacted;
    }

    var shoot =
    {
rowPos : row,
columnPos: column,
controlId : controlId

    };

    this.delegate.fire(shoot)
  }

}
