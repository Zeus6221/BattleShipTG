import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user: User){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    var elemets = JSON.stringify(user);
    this.http.post("/api/Register", user, {headers: headers})
             .subscribe(error=>
                               {
                                 console.log(error);
                               }
                       );
  }
}
