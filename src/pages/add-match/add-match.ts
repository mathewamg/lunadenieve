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
    comment: ''
  }
  image;
  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService, private toastController: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMatchPage');
  }

  createMatch() {
    //console.log(this.match)
    this.image = _.sample(['../assets/img/padel1.jpg', '../assets/img/padel2.jpg', '../assets/img/padel3.jpg', '../assets/img/padel4.jpg']);
    this.DbApiService.addMatch(this.match, this.image);
    let toast = this.toastController.create({
      message: 'Partido creado con éxito',
      position: 'bottom',
      duration: 5000
    });
    toast.present();
    this.navCtrl.push(HomePage);
    
  }
}
