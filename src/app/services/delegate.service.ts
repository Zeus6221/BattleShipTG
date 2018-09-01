import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { FireTarget } from '../interfaces/fire-target';

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  constructor(private http: HttpClient) { }

  fire(shoot: FireTarget){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    var elemets = JSON.stringify(shoot);
    this.http.post("/api/Values", shoot, {headers: headers})
             .subscribe(error=>
                               {
                                 console.log(error);
                               }
                       );
  }
}
