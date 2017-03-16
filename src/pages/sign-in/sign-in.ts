import { DbApiService } from './../../shared/db-api.service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

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
  loader: any;
  user: { email: string, username: string, password: string, name: string, surname: string, phone: string, level: string, age: string } = {
    email: '',
    username: '',
    password: '',
    name: '',
    surname: '',
    phone: '',
    level: '',
    age: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private DbApiService: DbApiService, 
  private toastController: ToastController, private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  createUser() {
    this.DbApiService.addUser(this.user).then((authData) => {
      this.navCtrl.popToRoot();
      let toast = this.toastController.create({
        message: 'Usuario registrado con éxito',
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    }).catch((error) => {
      this.showError(error);
    });
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
