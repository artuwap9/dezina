import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private statusBar: StatusBar){

  }
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleBlackOpaque();
  }
}
