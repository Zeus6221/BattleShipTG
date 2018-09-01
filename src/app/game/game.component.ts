import { Component, OnInit } from '@angular/core';
import { Player } from '../interfaces/player';
import { Board } from '../interfaces/board';
import { DelegateService } from '../services/delegate.service';
import { FireTarget } from '../interfaces/fire-target';
import { ContentCell } from '../enumerations/content-cell.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playerOne: Player = <Player>{};
  playerTwo: Player = <Player>{};

  constructor(private delegate: DelegateService) {
    this.playerOne.ownBoard = <Board>{};
    this.playerOne.opositBoard = <Board>{};
    this.playerOne.ownBoard.positions = new Array<Array<FireTarget>>();
    this.playerOne.opositBoard.positions = new Array<Array<FireTarget>>();
    this.createBoard();
  }

  ngOnInit() {
  }

  createBoard() {

    for (let row = 0; row < 10; row++) {
    
      this.playerOne.ownBoard.positions[row] = new Array<FireTarget>();
      this.playerOne.opositBoard.positions[row] = new Array<FireTarget>();
      for (let column = 0; column < 10; column++) {

        var impactCell : FireTarget = {
          row: row,
          column : column,
          content : ContentCell.Sea,
          id : 'fbac9f9b-cfd8-4771-a3bc-54be7bb6362b'
        }

        var impactOpositCell : FireTarget = {
          row: row,
          column : column,
          content : ContentCell.Sea,
          id : 'fbac9f9b-cfd8-4771-a3bc-54be7bb6362b'
        }

        this.playerOne.ownBoard.positions[row].push(impactCell);
        this.playerOne.opositBoard.positions[row].push(impactOpositCell);
      }
    }
  }

  fireTorpedo(e) {
    console.log(e);
    var controlId = e.target.id;
    var row = controlId.split("-")[0];
    var column = controlId.split("-")[1];
    var originBoard = controlId.split("-")[2];
    
    
    if (originBoard == "ownBoard") {
      (
        this.playerOne.ownBoard.positions[row])[column].content = ContentCell.SuccessImpact;
        var shoot: FireTarget = (this.playerOne.ownBoard.positions[row])[column];
        this.delegate.fire(shoot);
    }
    else {      
      (this.playerOne.opositBoard.positions[row])[column].content = ContentCell.FailImpact;
      var shoot: FireTarget = (this.playerOne.opositBoard.positions[row])[column];
      this.delegate.fire(shoot)
    }   
  }
}
