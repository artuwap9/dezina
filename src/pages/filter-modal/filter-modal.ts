import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {
  public chocolateSelected = true;
  public vegetarianSelected = true;
  public mousseSelected = true;
  public nutsSelected = true;

  constructor(private viewControlleR: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.chocolateSelected = this.navParams.get("chocolateSelected");
    this.vegetarianSelected = this.navParams.get("vegetarianSelected");
    this.mousseSelected = this.navParams.get("mousseSelected");
    this.nutsSelected = this.navParams.get("nutsSelected");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModalPage');
  }

  closeModal(){
    let filterState = {
      chocolateSelected: this.chocolateSelected,
      vegetarianSelected: this.vegetarianSelected,
      mousseSelected: this.mousseSelected,
      nutsSelected: this.nutsSelected,
    };
    this.viewControlleR.dismiss(filterState);
  }

}
