import { TabsPage } from './../pages/tabs/tabs';
import { DbApiService } from './../shared/db-api.service';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

//import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage = LoginPage;
  isAppInitialized: boolean = false;
  constructor(private platform: Platform, private DbApiService: DbApiService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.DbApiService.isAuthenticated().subscribe(data => {
          if (!this.isAppInitialized) {
            this.nav.setRoot(TabsPage);
            this.isAppInitialized = true;
          }
        }, err => {
          this.nav.setRoot(LoginPage);
        });
    });
  }
}
