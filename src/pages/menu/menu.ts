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
  userInfo: any;
  username: any;
  level: any;
  image: any;

  constructor(public navCtrl: NavController, private DbApiService: DbApiService,
    private ImageService: Image) {

  }

  ionViewDidLoad() {
    this.DbApiService.getUserInfo().subscribe(resp => {
      this.userInfo = resp;
      console.log("userInfo: ", this.userInfo);
      this.userInfo.forEach(field => {
        if (field.$key == 'level') {
          this.level = field.$value;
        } else if (field.$key == 'profile_image') {
          this.image = field.$value;
        } else if (field.$key == 'username') {
          this.username = field.$value;
        }
      });
    });

  }

  // onLoad() {
  //   this.loading = false;
  // }

  updateProfileImage() {
    this.ImageService.selectImage();
  }


}
