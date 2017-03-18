//import { TabsPage } from './../pages/tabs/tabs';
//import { LoadingController, NavController, ToastController, AlertController } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from "angularfire2";
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

@Injectable()
export class DbApiService {
  matches: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire, private platform: Platform) {
    this.af.auth.subscribe(auth => console.log("login: ", auth));
  }

  getFireMatches(): FirebaseListObservable<any[]> {
    this.matches = this.af.database.list('/matches');
    return this.matches;
  }

  //   removeItem(id) {
  //     this.items.remove(id);
  //   }

  getFireUsers(): FirebaseListObservable<any[]> {
    this.users = this.af.database.list('/users');
    return this.users;
  }

  addMatch(match, image, longitude, latitude) {
    this.matches.push({
      name: match.name, place: match.place, time: match.time, level: match.level,
      comment: match.comment, image: image, longitude: longitude, latitude: latitude
    });
  }

  // addUser(user) {
  //   //this.users = this.af.database.list('/users');
  //   this.getFireUsers().push({
  //     username: user.username,
  //     name: user.name,
  //     surname: user.surname,
  //     phone: user.phone,
  //     level: user.level,
  //     age: user.age
  //   });

  //   return this.af.auth.createUser({
  //     email: user.email,
  //     password: user.password
  //   });
  // }

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
          profile_image: 'https://firebasestorage.googleapis.com/v0/b/lunadenieve-adbde.appspot.com/o/Profile%20Images%2Fprofile_image.png?alt=media&token=e0f6aa4e-b09e-4c08-8055-c5363deb579d'
        });
        credentials.created = true;
        observer.next(credentials);
      }); //.catch((error: any) => {
      //   if (error) {
      //     switch (error.code) {
      //       case 'INVALID_EMAIL':
      //         observer.error('Email inválido');
      //         break;
      //       case 'EMAIL_TAKEN':
      //         observer.error('Ya existe este email');
      //         break;
      //       case 'NETWORK_ERROR':
      //         observer.error('Ha ocurrido algún error al intentar conectar con el servidor, inténtelo más tarde por favor');
      //         break;
      //       default:
      //         observer.error(error);
      //     }
      //   }
      // });
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

  // fireLogin(credentials) {
  //   return this.af.auth.login({
  //     email: credentials.email,
  //     password: credentials.password
  //   });
  // }

  getCurrentUser() {
    return this.af.auth.getAuth();
  }

  fireLogout() {
    this.af.auth.logout();
  }
}