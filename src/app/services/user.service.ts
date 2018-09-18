import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private angularFireDatabase: AngularFireDatabase) { }

  addUser(userLogged:User){
    return this.angularFireDatabase.object('users/' + userLogged.id).set(userLogged);
  }

  getUser(id){
    return this.angularFireDatabase.object('users/' + id).valueChanges();
  }
}
