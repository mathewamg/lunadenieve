import { TabsPage } from './../tabs/tabs';
import { SignInPage } from './../sign-in/sign-in';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DbApiService } from './../../shared/db-api.service';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  credentials: { email: string, password: string } = {
    email: '',
    password: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService, private toastController: ToastController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.DbApiService.fireLogin(this.credentials);
    let toast = this.toastController.create({
      message: 'Te has logueado con éxito',
      position: 'bottom',
      duration: 3000
    });
    toast.present();
    this.navCtrl.setRoot(TabsPage);
  }

  createAccount() {
    this.navCtrl.push(SignInPage);
  }
}