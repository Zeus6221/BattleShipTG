import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Conversation } from '../interfaces/conversation';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDatabase:AngularFireDatabase) { }

  createConversation(conversation:Conversation){
    var path = "conversations";
    const obj =  this.angularFireDatabase.database.ref(path);
    return obj.push(conversation);
  }

}
