import { GoogleMapsPage } from './../google-maps/google-maps';
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
  userInfo: any;
  joined: boolean = false;
  profileImage: any;
  keyProfileImage: string;
  images: any;
  userImages = [];
  userJoined: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DbApiService: DbApiService) {
    this.match = this.navParams.data;
  }

  // ionViewDidLoad() {
  //   this.DbApiService.getUserInfo().subscribe(resp => {
  //     this.userInfo = resp;
  //     this.userInfo.forEach(field => {
  //       if (field.$key == 'profile_image') {
  //         this.profileImage = field.$value;
  //       }
  //     });
  //   });

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
      this.userImages = [];
      for (let image of this.images) {
        this.userImages.push(image.$value);
      }
    });
    this.DbApiService.getFireMembers(this.match.$key).subscribe(resp => {
      this.userJoined = resp;
      let currentUser = this.DbApiService.getCurrentUser().uid;
      for (let user of this.userJoined) {
        if (user.$value == currentUser) {
          this.joined = true;
        }
      }
    });

  }

  joinMatch() {
    this.member = this.DbApiService.getCurrentUser().auth.uid;

    this.DbApiService.addMembersToMatch(this.match.$key, this.member, this.profileImage);
  }

  unJoinMatch() {
    this.member = this.DbApiService.getCurrentUser().auth.uid;

    for (let image of this.images) {
      if (image.$value == this.profileImage) {
        this.keyProfileImage = image.$key;
      }
    }
    //console.log("keyprofileImage: " + this.userImages);

    var remove = this.DbApiService.removeMembersToMatch(this.match.$key, this.member, this.keyProfileImage);
    // this.DbApiService.removeMatchesToMember(this.match.$key, this.member);
    this.joined = false;
    if(remove){  
      this.navCtrl.popToRoot();
    }
  }

  goToGoogleMaps() {
    this.navCtrl.push(GoogleMapsPage, this.match);
  }
}