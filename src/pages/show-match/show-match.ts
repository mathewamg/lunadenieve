import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DbApiService } from "../../shared/db-api.service";

/*
  Generated class for the ShowMatch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-match',
  templateUrl: 'show-match.html'
})
export class ShowMatchPage {
  match: any;
  member: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService) {
    this.match = this.navParams.data; 
  }

  // joinMatch(){
  //   this.DbApiService.gerFireJoinMatch(this.match.$key).subscribe(users => {
  //     this.members = users;
  //   });
  // }

  joinMatch(){
    this.member = this.DbApiService.getCurrentUser().auth.uid;
    this.DbApiService.addMembersToMatch(this.match.$key, this.member);
  }

  unJoinMatch(){
    this.member = this.DbApiService.getCurrentUser().auth.uid;
    this.DbApiService.removeMembersToMatch(this.match.$key, this.member);
    // this.DbApiService.removeMatchesToMember(this.match.$key, this.member);
  }
}
