import { LoginPage } from './../login/login';
import { Image } from './../../providers/image';
import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

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
    private ImageService: Image, private toastController: ToastController) {

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
        } else if (field.$key == 'username' || field.$key == 'name') {
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

  logout() {
    this.DbApiService.fireLogout();
    let toast = this.toastController.create({
      message: 'Hasta pronto guapo!',
      position: 'bottom',
      duration: 3000
    });
    toast.present();
    this.navCtrl.parent.parent.setRoot(LoginPage);
  }

}
