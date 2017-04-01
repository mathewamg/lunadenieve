import { ShowMatchPage} from './../show-match/show-match';
import { AddMatchPage } from './../add-match/add-match';
import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = "Partidos Disponibles";
  matches: any[];
  counter = [];
  numberJoinMembers = 0;
  private allMatches: any;
  private sortByTime: any;
    

  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController,
    private toastController: ToastController) {
  }
  
  ionViewDidLoad() {
    let currentUser = this.DbApiService.getCurrentUser();
    console.log("Current User is ", currentUser.auth.email);
    let loader = this.loadingController.create({
      content: 'Por favor espera...'
    });
    loader.present().then(() => {
      //this.DbApiService.fireLogin();
      this.DbApiService.getFireMatches().subscribe(resp => {
        this.allMatches = resp; 
        this.sortByTime = _.chain(this.allMatches).sortBy('time').value();
        this.matches = this.sortByTime;
        loader.dismiss();
        this.counter = [];
        for (let match of this.matches){
          this.counter.push(Object.keys(match.members).length);
        }
      });
    });
    
  }


  addMatch() {
    this.navCtrl.push(AddMatchPage);
  }

  showMatch($event, match) {
    this.navCtrl.push(ShowMatchPage, match);
  }
}
