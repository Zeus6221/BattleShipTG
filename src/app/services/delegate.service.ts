import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase } from '@angular/common/http'
import { FireTarget } from '../interfaces/fire-target';
import { Game } from '../interfaces/game';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { InitGame } from '../interfaces/init-game';
import { ActualGame } from '../interfaces/actual-game';

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  constructor(private http: HttpClient, private afDB: AngularFireDatabase) { }

  fire(shoot: FireTarget): Observable<FireTarget> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<FireTarget>("/api/Values", shoot, { headers: headers });
  }

  createOrFind(init: InitGame): Observable<Game> {
    console.log(JSON.stringify(init));
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Game>("/api/Game", init, { headers: headers })
  }

  getFire(id) {
    return this.afDB.object('CurrentFire/' + id).valueChanges();
  }

  getAvailableGames() {
    var itemCollection = this.afDB.list('ActualGame/');
    return itemCollection.valueChanges();
  }

  getActualGame(idGame: string) {
    return this.http.get<ActualGame>('/api/ActualGame/' + idGame);
  }

  updateActualGame(actualGame: ActualGame) {    
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('/api/ActualGame', actualGame, { headers: headers });
  }

}
