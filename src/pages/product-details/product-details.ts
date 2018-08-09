import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GalleryModal } from '../../../node_modules/ionic-gallery-modal';
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  public productDetails = [];
  private images = [] as any;
  private id = [] as any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private modalController: ModalController, private statusBar: StatusBar) {
    this.productDetails = this.navParams.get("productDetails");
    console.log(this.productDetails);
    this.id = this.navParams.get("id");
    console.log(this.id);
    for(let i=1; i<7; i++){
      this.images.push({
        url: `../assets/imgs/${this.id}/${i}.jpg`
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleBlackOpaque();
  }

  openGallery(){
    let modal = this.modalController.create(GalleryModal, {
      photos: this.images,
      initialSlide: 0,
      closeIcon: 'arrow-back'
    });
    modal.present();
  }

}
