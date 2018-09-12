import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Conversation } from '../interfaces/conversation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  
  constructor(private angularFireDatabase:AngularFireDatabase,private http: HttpClient) { }

  // createConversation(conversation:Conversation){
  //   var path = "conversations/";
  //   return  this.angularFireDatabase
  //                    .object(path+conversation.Id)
  //                    .set(conversation);
    
  // }
  
  createConversation(conversation:Conversation) {
    return this.angularFireDatabase
               .object('conversations/' + conversation.Id + '/' + conversation.Timestamp).set(conversation);
  }


  getConversation(uid) {
    return this.angularFireDatabase.list('conversations/' + uid);
  }
}
