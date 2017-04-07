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
  Generated class for the GoogleMaps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html'
})
export class GoogleMapsPage {
  match: any;
  matchInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DbApiService: DbApiService, private googleMaps: GoogleMaps) {
    this.match = this.navParams.data;
  }

  ionViewDidLoad() {
    this.loadMap();
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
        'controls': {
          'background-color': 'white',
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
          position: location
        };

        map.addMarker(markerOptions).then((marker: Marker) => {
          marker.showInfoWindow();
        });
      });


    });

  }

}
