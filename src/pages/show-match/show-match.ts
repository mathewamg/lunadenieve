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
  empty: boolean = true;
  userInfo: any;
  profileImage: any;
  images: any;
  userImages = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService) {
    this.match = this.navParams.data;
  }

  ionViewDidLoad() {
    this.DbApiService.getUserInfo().subscribe(resp => {
      this.userInfo = resp;
      this.userInfo.forEach(field => {
        if (field.$key == 'profile_image') {
          this.profileImage = field.$value;
        }
      });
    });    
    this.DbApiService.getFireMembersPictures(this.match.$key).subscribe(resp => {
      this.images = resp;
    });  
    for (let image of this.images){
      this.userImages.push(image.$value);
    }    
  }

  joinMatch() {
    this.member = this.DbApiService.getCurrentUser().auth.uid;
    this.DbApiService.addMembersToMatch(this.match.$key, this.member, this.profileImage);
    this.empty = false;
  }

  unJoinMatch() {
    this.member = this.DbApiService.getCurrentUser().auth.uid;
    this.DbApiService.removeMembersToMatch(this.match.$key, this.member, this.profileImage);
    this.empty = true;
    // this.DbApiService.removeMatchesToMember(this.match.$key, this.member);
  }
}
