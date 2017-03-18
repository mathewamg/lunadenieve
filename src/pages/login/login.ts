import { TabsPage } from './../tabs/tabs';
import { SignInPage } from './../sign-in/sign-in';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
  credentials: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService,
    private toastController: ToastController, private alertCtrl: AlertController) {
    this.credentials = {
      email: '',
      password: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.DbApiService.loginWithEmail(this.credentials).subscribe(data => {
      this.navCtrl.setRoot(TabsPage);
      let toast = this.toastController.create({
        message: 'Te has logueado con éxito',
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    }, err => {
      this.showError(err);
    });
  }

  loginUserWithFacebook() {
    this.DbApiService.loginWithFacebook().subscribe(data => {
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      this.showError(err);
    });
  }

  createAccount() {
    this.navCtrl.push(SignInPage);
  }

  showError(text) {
    let prompt = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    prompt.present();
  }
}