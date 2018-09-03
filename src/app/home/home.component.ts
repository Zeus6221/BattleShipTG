import { Component, OnInit } from '@angular/core';
import { DelegateService } from '../services/delegate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  availableGames: any;
  constructor(private delegate: DelegateService) {

    delegate.getAvailableGames().subscribe(
      response => {
        this.availableGames = response;
        console.log(response);
      }
    );

  }

  ngOnInit() {
  }

}
