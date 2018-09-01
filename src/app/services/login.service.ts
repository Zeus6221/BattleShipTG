import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    var elemets = JSON.stringify(user);
    this.http.post("/api/Login", user, {headers: headers})
             .subscribe(
              response=>{
                console.log(response);
              },
              error=>
                               {
                                 console.log(error);
                               }
                       );
  }
}
