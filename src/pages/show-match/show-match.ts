import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DbApiService } from "../../shared/db-api.service";
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

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
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DbApiService: DbApiService, public platform: Platform) {
    this.match = this.navParams.data;
    platform.ready().then(() => {
      this.loadMap();
    })
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

        if (image.$value == this.profileImage) {
          this.keyProfileImage = image.$key;
        }
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

  loadMap() {
    let location = new GoogleMapsLatLng(-34.9290, 138.6010);

    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': location,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }

  joinMatch() {
    this.member = this.DbApiService.getCurrentUser().auth.uid;

    this.DbApiService.addMembersToMatch(this.match.$key, this.member, this.profileImage);
  }

  unJoinMatch() {
    this.member = this.DbApiService.getCurrentUser().auth.uid;

    this.DbApiService.removeMembersToMatch(this.match.$key, this.member, this.keyProfileImage);
    // this.DbApiService.removeMatchesToMember(this.match.$key, this.member);
    this.joined = false;
  }
}
