import { AddMatchPage } from './../add-match/add-match';
import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = "PadelConnect";
  matches: any[];
  private allMatches: any;
  private sortByTime: any;
  

  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController) {
  }
  
  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Por favor espera...'
    });
    loader.present().then(() => {
      this.DbApiService.fireLogin();
      this.DbApiService.getFireMatches().subscribe(resp => {
        this.allMatches = resp; 
        this.sortByTime = _.chain(this.allMatches).sortBy('time').value();
        this.matches = this.sortByTime;
        console.log("resp fire", resp);
        loader.dismiss();
      });
    });
  }

  addMatch() {
    this.navCtrl.push(AddMatchPage);
  }
}
