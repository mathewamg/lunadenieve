import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DbApiService } from "../../shared/db-api.service";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

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
  matchInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DbApiService: DbApiService, private googleMaps: GoogleMaps) {
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

    this.loadMap();

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

    this.DbApiService.getMatchInfo(this.match.$key).subscribe(res => {
      //console.log(res);
      this.matchInfo = res;
      let matchLongitude;
      let matchLatitude;
      this.matchInfo.forEach(field => {
        if (field.$key == 'longitude') {
          matchLongitude = field.$value;
        } else if (field.$key == 'latitude') {
          matchLatitude = field.$value;
        }
      });

      let element: HTMLElement = document.getElementById('map');

      let location: LatLng = new LatLng(matchLatitude, matchLongitude);

      let map: GoogleMap = this.googleMaps.create(element, {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true,
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

      map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let position: CameraPosition = {
          target: location,
          zoom: 15,
          tilt: 30,
          bearing: 50
        };

        map.moveCamera(position);

        let markerOptions: MarkerOptions = {
          position: location,
          title: 'Tenso pa allí!'
        };

        map.addMarker(markerOptions).then((marker: Marker) => {
          marker.showInfoWindow();
        });
      });


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