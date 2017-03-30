import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from "angularfire2";
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

@Injectable()
export class DbApiService {
  matches: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;
  auth: any;
  user: any;

  constructor(private af: AngularFire, private platform: Platform) {
    this.af.auth.subscribe(auth => {
      console.log("login: ", auth);
      this.auth = auth;
    });
  }

  getFireMatches(): FirebaseListObservable<any[]> {
    this.matches = this.af.database.list('/matches');
    return this.matches;
  }

  getFireUsers(): FirebaseListObservable<any[]> {
    this.users = this.af.database.list('/users');
    return this.users;
  }

  getUserInfo() {
    this.user = this.af.database.list('/users/' + this.getCurrentUser().uid);
    return this.user;

  }

  addMatch(match, image, longitude, latitude) {
    this.matches.push({
      name: match.name, place: match.place, time: match.time, level: match.level,
      comment: match.comment, image: image, longitude: longitude, latitude: latitude
    });
  }

  //   removeItem(id) {
  //     this.items.remove(id);
  //   }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUser({
        email: credentials.email,
        password: credentials.password
      }).then((authData: any) => {
        this.af.database.list('/users').update(authData.uid, {
          username: credentials.username,
          name: credentials.name,
          surname: credentials.surname,
          phone: credentials.phone,
          level: credentials.level,
          age: credentials.age,
          email: authData.auth.email,
          profile_image: 'https://firebasestorage.googleapis.com/v0/b/lunadenieve-adbde.appspot.com/o/profile%2Fprofile_image.jpg?alt=media&token=ee61c024-f7dd-43f4-a84d-31690b7bd444'
        });
        credentials.created = true;
        observer.next(credentials);
      }).catch((error: any) => {
        if (error) {
          switch (error.code) {
            case 'INVALID_EMAIL':
              observer.error('Email inválido');
              break;
            case 'EMAIL_TAKEN':
              observer.error('Ya existe este email');
              break;
            case 'NETWORK_ERROR':
              observer.error('Ha ocurrido algún error al intentar conectar con el servidor, inténtelo más tarde por favor');
              break;
            default:
              observer.error(error);
          }
        }
      });
    });
  }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.login(credentials, {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }).then((authData) => {
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // fireLogin(credentials) {
  //   return this.af.auth.login({
  //     email: credentials.email,
  //     password: credentials.password
  //   });
  // }

  loginWithFacebook() {
    return Observable.create(observer => {
      if (this.platform.is('cordova')) {
        Facebook.login(['public_profile', 'email']).then(facebookData => {
          let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
          firebase.auth().signInWithCredential(provider).then(firebaseData => {
            this.af.database.list('users').update(firebaseData.uid, {
              name: firebaseData.displayName,
              email: firebaseData.email,
              profile_image: firebaseData.photoURL
            });
            observer.next();
          });
        }, error => {
          observer.error(error);
        });
      } else {
        this.af.auth.login({
          provider: AuthProviders.Facebook,
          method: AuthMethods.Popup
        }).then((facebookData) => {
          this.af.database.list('users').update(facebookData.auth.uid, {
            name: facebookData.auth.displayName,
            email: facebookData.auth.email,
            profile_image: facebookData.auth.photoURL
          });
          observer.next();
        }).catch((error) => {
          console.info("error", error);
          observer.error(error);
        });
      }
    });
  }

  fireLogout() {
    this.af.auth.logout();
  }

  getCurrentUser() {
    return this.auth;
    //return this.af.auth.getAuth().auth;
    //return firebase.auth().currentUser;
  }

  // getCurrentProfileImage(): string {
  //   let currentUser = this.getCurrentUser().uid;
  //   let urlRef = firebase.database().ref('users/' + currentUser + '/profile_image');
  //   urlRef.on('value', snapshot => {
  //     this.url = snapshot.val();
  //   });
  //   return this.url;
  // }

  //Subir imágenes al storage de firebase
  uploadImage(image) {
    let storageRef: any,
      imageName: any,
      uploadTask: any,
      currentUser: any,
      metadata = {
        contentType: 'image/jpg'
      };

    storageRef = firebase.storage().ref();
    currentUser = this.getCurrentUser().uid;
    imageName = "profile_image_" + currentUser + ".jpg";
    uploadTask = storageRef.child('profile/' + imageName).put(image, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        let downloadURL = uploadTask.snapshot.downloadURL;
        //console.log("downloadURL: " + downloadURL);
        firebase.database().ref('users/' + currentUser).update({
          profile_image: downloadURL
        });
      });
  }

}