import { MenuPage } from './../menu/menu';
import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SearchPage;
  tab3Root: any = MenuPage;

  constructor() {

  }
}
