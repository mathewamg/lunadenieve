import { Injectable } from "@angular/core";
import { AngularFire, FirebaseListObservable } from "angularfire2";

@Injectable()
export class DbApiService {
  matches: FirebaseListObservable<any[]>;

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

  fireLogin() {
    this.af.auth.login({
      email: "padelista_amateur@trozo.com",
      password: 'trozoo'
    });
  }

  addMatch(match, image, longitude, latitude) {
    this.matches.push({ name: match.name, place: match.place, time: match.time, level: match.level, comment: match.comment, image: image, longitude: longitude, latitude: latitude });
  }
}