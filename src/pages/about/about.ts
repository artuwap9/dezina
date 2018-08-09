import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductProvider } from "../../providers/product/product"
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public bestSellerProducts = [];

  constructor(
    private productProvider: ProductProvider, 
    public navCtrl: NavController,
    private statusBar: StatusBar) {

  }

  ionViewWillEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleBlackOpaque();
  }

  ionViewDidLoad(){
    this.productProvider.getProducts()
      .subscribe((allProducts: Array<any>) => {
        this.bestSellerProducts = allProducts.filter(product=> product.bestSeller == true)
    });
  }
}