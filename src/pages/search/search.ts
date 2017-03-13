import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DbApiService } from './../../shared/db-api.service';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {
  
  searchQuery: any;
  matches: any;
  
  constructor(public navCtrl: NavController, private DbApiService: DbApiService) {
    this.DbApiService.getFireMatches().subscribe(resp => {
        this.matches = resp; 
    });
  }

  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.DbApiService.getFireMatches().subscribe(resp => {
        this.matches = resp; 
    });
    // set val to the value of the searchbar
    let val = ev.target.value;
    
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      
      this.matches = this.matches.filter((item) => {
        return (item.place.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}



  
