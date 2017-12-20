import { Storage } from '@ionic/storage';
import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as _ from 'lodash';

/**
 * Generated class for the Comments page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  machtId: any;
  comments: any[];
  comments_sort: any[];
  comment: string;
  userInfo: any;
  username: any;
  level: any;
  image: any;
  currentUserId: any;
  users: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private vc: ViewController, private db: DbApiService, private storage: Storage) {
    this.machtId = this.navParams.get("match_id");
  }

  ionViewDidLoad() {
    this.currentUserId = this.db.getCurrentUser().uid;
    this.db.getComments(this.machtId).subscribe(resp => {
      this.comments = resp;
      this.comments_sort = _.chain(this.comments).sortBy('time').reverse().value();
      this.comments = this.comments_sort;
    });
    this.db.getUserInfo().subscribe(resp => {
      this.userInfo = resp;
      console.log("userInfo: ", this.userInfo);
      this.userInfo.forEach(field => {
        if (field.$key == 'level') {
          this.level = field.$value;
        } else if (field.$key == 'profile_image') {
          this.image = field.$value;
        } else if (field.$key == 'username' || field.$key == 'name') {
          this.username = field.$value;
        }
      });
    });
    this.db.getFireMembers(this.machtId).subscribe(resp => {
      this.users = resp;
    })

  }

  close() {
    this.vc.dismiss();
  }

  addComment() {
    this.db.addComment(this.machtId, this.comment, this.image, this.username);
    this.comment = '';
  }

  removeComment(commentId) {
    this.db.removeComment(this.machtId, commentId);
  }

}