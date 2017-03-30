import { Image } from './../../providers/image';
import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  //loading: boolean = true;
  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private ImageService: Image) {

  }
  
  getProfileImage() {
    // return this.DbApiService.getCurrentUser().auth.photoURL; // Sólo funciona con facebook
    return this.DbApiService.getCurrentProfileImage();
  }

  // onLoad() {
  //   this.loading = false;
  // }

  updateProfileImage() {
    this.ImageService.selectImage();
  }


}
