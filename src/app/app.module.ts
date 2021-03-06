import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GameComponent } from './game/game.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GuardService } from './services/guard.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { CreateGameComponent } from './create-game/create-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes =
  [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },    
    { path: 'crear/new', component: CreateGameComponent },
    { path: 'game/:id', component: GameComponent }
//    { path: 'game/:id', component: GameComponent, canActivate: [GuardService] }
  ]

export const firebaseConfig = {
  apiKey: "AIzaSyDul8dAV__kaO0mW6dCcQatQ1PJB0ydIAs",
  authDomain: "battleship-dbe3a.firebaseapp.com",
  databaseURL: "https://battleship-dbe3a.firebaseio.com",
  storageBucket: "battleship-dbe3a.appspot.com",
  messagingSenderId: '716676542288'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GameComponent,
    HomeComponent,
    CreateGameComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [AngularFireDatabase, GuardService, LoginService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
