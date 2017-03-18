import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController, private DbApiService: DbApiService) {

  }

  //Sólo funciona con facebook
  getProfileImage() {
    return this.DbApiService.getCurrentUser().auth.photoURL;
  }


}
