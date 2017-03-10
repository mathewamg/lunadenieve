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

//   addItem(tarea) {
//     this.items.push({ action: tarea, done: false });
//   }

//   removeItem(id) {
//     this.items.remove(id);
//   }

  fireLogin() {
    this.af.auth.login({
      email: "padelista_amateur@trozo.com",
      password: 'trozoo'
    });
  }

}