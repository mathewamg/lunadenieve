import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMatchPage');
  }

  createMatch() {
    //console.log(this.match)
    this.DbApiService.addMatch(this.match);
  }
}
