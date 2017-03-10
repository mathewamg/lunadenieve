import { AngularFireModule, AuthProviders, AuthMethods } from "angularfire2";
import { DbApiService } from './../shared/db-api.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from "../pages/menu/menu";
import { SearchPage } from "../pages/search/search";

export const firebaseConfig = {
  apiKey: "AIzaSyDlFG0TvvPKYTZVRuF6qsDvRiHZ6IUNcLY",
  authDomain: "lunadenieve-adbde.firebaseapp.com",
  databaseURL: "https://lunadenieve-adbde.firebaseio.com",
  storageBucket: "lunadenieve-adbde.appspot.com",
  messagingSenderId: "201783602907"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    MenuPage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    MenuPage,
    HomePage,
    TabsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, DbApiService]
})
export class AppModule { }
