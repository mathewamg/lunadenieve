import { DbApiService } from './../shared/db-api.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera } from 'ionic-native';
/*
  Generated class for the Image provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Image {
  
  constructor(public http: Http, private DbApiService: DbApiService) {
    console.log('Hello Image Provider');
  }

  selectImage() {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      targetWidth: 320,
      targetHeight: 240,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    };

    Camera.getPicture(cameraOptions)
      .then((data) => {
        let imageBase64 = data;
        let byteCharacters = atob(imageBase64);
        let byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        let blob = new Blob([byteArray], { type: 'image/jpg' });
        this.DbApiService.uploadImage(blob);
      });
  }
}
