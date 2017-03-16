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

  addMatch(match, image, longitude, latitude) {
    this.matches.push({ name: match.name, place: match.place, time: match.time, level: match.level, 
      comment: match.comment, image: image, longitude: longitude, latitude: latitude });
  }

  addUser(user) {
    this.af.auth.createUser({ 
      email: user.email,
      password: user.password
    });
    this.users = this.af.database.list('/users');
    this.users.push({
    username: user.username,
    name: user.name,
    surname: user.surname,
    phone: user.phone,
    level: user.level,
    age: user.age })
  }
  
  fireLogin(credentials) {
    this.af.auth.login({
      email: credentials.email,
      password: credentials.password
    });
  }

  fireLogout() {
    this.af.auth.logout();
  }
}