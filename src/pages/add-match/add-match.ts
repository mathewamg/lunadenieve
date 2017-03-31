import { HomePage } from './../home/home';
import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as _ from 'lodash';

/*
  Generated class for the AddMatch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-match',
  templateUrl: 'add-match.html'
})
export class AddMatchPage {
  match: {name: string, place: string, time: string, level: string, comment: string} = {
    name: '',
    place: '',
    time: '',
    level: '',
    comment: '',
  }
  image;
  latitude;
  longitude;
  members;
  pictures;
  userInfo;
  CurrentUserImageProfile;
  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService, private toastController: ToastController) {}

  ionViewDidLoad() {
    this.DbApiService.getUserInfo().subscribe(resp => {
      this.userInfo = resp;
      this.userInfo.forEach(field => {
        if (field.$key == 'profile_image') {
          this.CurrentUserImageProfile = field.$value;
          console.log(this.CurrentUserImageProfile);
        }
      });
    });    
  }

  createMatch() {
    //console.log(this.match)
    switch (this.match.place) {
      case '7 palmas':
        this.longitude = '-15.4554596';
        this.latitude = '28.0976722';
        break;
      case 'Palmeras Golf Las Palmas':
        this.longitude = '-15.4460217';
        this.latitude = '28.12495';
        break;
      case '4+quepadel':
        this.longitude = '-15.4131637';
        this.latitude = '28.161232';
        break;
      case 'Castillo de Agüimes':
        this.longitude = '-15.4340745';
        this.latitude = '27.8683154';
        break;
    }
    this.members = [this.DbApiService.getCurrentUser().auth.uid];
    this.pictures = [this.CurrentUserImageProfile];
    this.image = _.sample(['https://firebasestorage.googleapis.com/v0/b/lunadenieve-adbde.appspot.com/o/Random%20Images%2Fpadel1.jpg?alt=media&token=52d9e434-ff43-4db6-a122-6064148f3f1a',
     'https://firebasestorage.googleapis.com/v0/b/lunadenieve-adbde.appspot.com/o/Random%20Images%2Fpadel2.jpg?alt=media&token=050cb10c-4f75-4812-99ca-ff7067948f4c',
      'https://firebasestorage.googleapis.com/v0/b/lunadenieve-adbde.appspot.com/o/Random%20Images%2Fpadel3.jpg?alt=media&token=7d772859-9a63-43e0-a662-de1e016085ea', 
      'https://firebasestorage.googleapis.com/v0/b/lunadenieve-adbde.appspot.com/o/Random%20Images%2Fpadel4.jpg?alt=media&token=5b970ae2-57ce-491b-ba0a-4323a1eb7760',
       'https://firebasestorage.googleapis.com/v0/b/lunadenieve-adbde.appspot.com/o/Random%20Images%2Fpadel5.jpg?alt=media&token=44c0ecb4-9e5d-4798-9a22-904de3350436']);
    this.DbApiService.addMatch(this.match, this.image, this.longitude, this.latitude, this.members, this.pictures);
    let toast = this.toastController.create({
      message: 'Partido creado con éxito',
      position: 'bottom',
      duration: 5000
    });
    toast.present();
    this.navCtrl.push(HomePage);
    
  }
}
