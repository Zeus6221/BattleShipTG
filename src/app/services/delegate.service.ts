import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FireTarget } from '../interfaces/fire-target';
import { Game } from '../interfaces/game';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { InitGame } from '../interfaces/init-game';

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  constructor(private http: HttpClient, private afDB: AngularFireDatabase) { }

  fire(shoot: FireTarget): Observable<FireTarget> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log("disparo");
    console.log(shoot);
    return this.http.post<FireTarget>("/api/Values", shoot, { headers: headers });
  }

  createOrFind(init: InitGame): Observable<Game> {
    console.log("from service crate");
    console.log(init);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<Game>("/api/Game", init, { headers: headers })
  }

  getFire(id) {
    return this.afDB.object('CurrentFire/' + id).valueChanges();
  }

  getAvailableGames() {
    return this.http.get<Game[]>("/api/Game");
  }
}
