import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from './../login/login';

/*
  Generated class for the SignIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {
  user: {email: string, username: string, password: string, name: string, surname: string, phone: string, level: string, age: string} = {
    email: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    phone: '',
    level: '',
    age: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService, private toastController: ToastController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  createUser() {
    this.DbApiService.addUser(this.user);
    let toast = this.toastController.create({
      message: 'Usuario registrado con éxito',
      position: 'bottom',
      duration: 5000
    });
    toast.present();
    this.navCtrl.push(LoginPage);
  }
}
