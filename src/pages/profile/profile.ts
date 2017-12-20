import { Image } from './../../providers/image';
import { Http } from '@angular/http';
import { ShowMatchPage} from './../show-match/show-match';
import { AddMatchPage } from './../add-match/add-match';
import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  userInfo: any;
  username: any;
  level: any;
  image: any;
  facebook: any;

  constructor(public navCtrl: NavController, private DbApiService: DbApiService,
    private ImageService: Image, private toastController: ToastController) {
      this.facebook = this.DbApiService.getCurrentUser().facebook;
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
}
