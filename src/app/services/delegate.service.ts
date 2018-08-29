import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  constructor(private http: HttpClient) { }

  fire(shoot){

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

    debugger;
    console.log("this was the shoot");
    console.log(shoot);
    var elemets = JSON.stringify(shoot);
    this.http.post("https://192.168.0.4:44384/api/values", elemets, {headers: headers});
  }
}
