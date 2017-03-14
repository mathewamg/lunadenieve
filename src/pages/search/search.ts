import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DbApiService } from './../../shared/db-api.service';
import * as _ from 'lodash';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {
  
  searchQuery: any;
  private allMatches: any;
  private allMatchPlaces: any;
  matches: any[];
  
  constructor(public navCtrl: NavController, private DbApiService: DbApiService) {
    // this.DbApiService.getFireMatches().subscribe(resp => {
    //     this.matches = resp; 
    // });
  }

  ionViewDidLoad(){
    this.DbApiService.getFireMatches().subscribe(resp => {
        this.allMatches = resp; 
        this.allMatchPlaces = _.chain(resp).groupBy('place').toPairs().map(item => _.zipObject(["placeName","matchPlaces"], item)).value();
        this.matches = this.allMatchPlaces;
        
    });
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.ionViewDidLoad();
    // set val to the value of the searchbar
    let val = ev.target.value;
    
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.matches = this.matches.filter((item) => {
        return (item.placeName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}



  
