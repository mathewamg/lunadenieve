//import { TabsPage } from './../pages/tabs/tabs';
//import { LoadingController, NavController, ToastController, AlertController } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Injectable()
export class DbApiService {
  matches: FirebaseListObservable<any[]>;
  users: FirebaseListObservable<any[]>;

  constructor(private af: AngularFire) {
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

  addUser(user) {
    //this.users = this.af.database.list('/users');
    this.getFireUsers().push({
      username: user.username,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      level: user.level,
      age: user.age
    });

    return this.af.auth.createUser({
      email: user.email,
      password: user.password
    });
  }

  fireLogin(credentials) {
    return this.af.auth.login({
      email: credentials.email,
      password: credentials.password
    });
  }

   getCurrentUser() {
     return this.af.auth.getAuth();
   }

  fireLogout() {
    this.af.auth.logout();
  }
}