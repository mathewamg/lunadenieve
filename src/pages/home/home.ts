import { AddMatchPage } from './../add-match/add-match';
import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  title = "PadelConnect";
  model = {
    user: "Alex",
    matches: []
  };
  
  constructor(public navCtrl: NavController, private DbApiService: DbApiService, private loadingController: LoadingController) {

  }
  ionViewDidLoad() {
    // let toast = this.toastController.create({
    //   message: 'Para eliminar alguna tarea, deslizar hacia la izquierda',
    //   position: 'bottom',
    //   duration: 4000
    // });
    // toast.present();
    let loader = this.loadingController.create({
      content: 'Please wait...'
    });
    loader.present().then(() => {
      this.DbApiService.fireLogin();
      this.DbApiService.getFireMatches().subscribe(resp => {
        this.model.matches = resp;
        console.log("resp fire", resp);
        loader.dismiss();
      });
    });

  }

  addMatch() {
    this.navCtrl.push(AddMatchPage);
  }
}
