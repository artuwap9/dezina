import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProductProvider } from "../../providers/product/product"
import { ProductDetailsPage } from "../product-details/product-details";
import { FilterModalPage } from "../../pages/filter-modal/filter-modal";
import { StatusBar } from '../../../node_modules/@ionic-native/status-bar';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts = [] as any;

  private chocolateSelected = true;
  private vegetarianSelected = true;
  private mousseSelected = true;
  private nutsSelected = true;

  constructor(
    private modalController: ModalController, 
    private productProvider: ProductProvider, 
    public navCtrl: NavController,
    private statusBar: StatusBar) {

  }

  ionViewDidLoad(){
    this.productProvider.getProducts()
      .subscribe((Response: Array<any>) => {
        this.allProducts = Response;
      });
  }
  ionViewDidEnter(){
    this.statusBar.overlaysWebView(true);
    this.statusBar.styleBlackOpaque();
  }

  goToProductDetailPage(product, id){
    let id2 = id;
    console.log("El id sería ",id2);
    this.navCtrl.push(ProductDetailsPage, {
      productDetails: product,
      id: id2
    });
  }

  openFilterModal(){
    let filterStateFromPage = {
      chocolateSelected: this.chocolateSelected,
      vegetarianSelected: this.vegetarianSelected,
      mousseSelected: this.mousseSelected,
      nutsSelected: this.nutsSelected
    };

    let openFilterModal = this.modalController.create(FilterModalPage, filterStateFromPage);
    openFilterModal.onDidDismiss((filterState)=>{

      this.chocolateSelected = filterState.chocolateSelected;
      this.vegetarianSelected = filterState.vegetarianSelected;
      this.mousseSelected = filterState.mousseSelected;
      this.nutsSelected = filterState.nutsSelected;

      this.productProvider.getProducts()
        .subscribe((allProducts)=> {
          let products = allProducts as any;
          if (
            filterState.vegetarianSelected && 
            filterState.chocolateSelected &&
            filterState.mousseSelected &&
            filterState.nutsSelected) {
              this.allProducts = products;
              return;
          } else if (
            !filterState.vegetarianSelected && 
            !filterState.chocolateSelected && 
            !filterState.mousseSelected &&
            !filterState.nutsSelected) {
              this.allProducts = [];
              return;
            } else if (
            filterState.vegetarianSelected && 
            !filterState.chocolateSelected && 
            !filterState.mousseSelected &&
            !filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.vegetarian == true;
            });
            } else if (
            !filterState.vegetarianSelected && 
            filterState.chocolateSelected && 
            !filterState.mousseSelected &&
            !filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.chocolate== true;
            });
          } else if (
            !filterState.vegetarianSelected && 
            !filterState.chocolateSelected && 
            filterState.mousseSelected &&
            !filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.mousse == true;
            });
          } else if (
            !filterState.vegetarianSelected && 
            !filterState.chocolateSelected && 
            !filterState.mousseSelected &&
            filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.nuts == true;
            });
          } else if (
            filterState.vegetarianSelected && 
            filterState.chocolateSelected && 
            !filterState.mousseSelected &&
            !filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.vegetarian || product.chocolate == true
              });
          } else if (
            filterState.vegetarianSelected && 
            !filterState.chocolateSelected && 
            filterState.mousseSelected &&
            !filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.vegetarian || product.mousse == true
              });
          } else if (
            filterState.vegetarianSelected && 
            !filterState.chocolateSelected && 
            !filterState.mousseSelected &&
            filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.vegetarian || product.nuts == true
              });
          } else if (
            !filterState.vegetarianSelected && 
            filterState.chocolateSelected && 
            !filterState.mousseSelected &&
            filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.chocolate || product.nuts == true
              });
          } else if (
            !filterState.vegetarianSelected && 
            filterState.chocolateSelected && 
            filterState.mousseSelected &&
            !filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.chocolate || product.mousse == true
              });
          } else if (
            !filterState.vegetarianSelected && 
            !filterState.chocolateSelected && 
            filterState.mousseSelected &&
            filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.mousse || product.nuts == true
              });
          } else if (
            filterState.vegetarianSelected && 
            filterState.chocolateSelected && 
            filterState.mousseSelected &&
            !filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.nuts == !true
              });
          } else if (
            filterState.vegetarianSelected && 
            filterState.chocolateSelected && 
            !filterState.mousseSelected &&
            filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.mousse == !true
              });
          } else if (
            filterState.vegetarianSelected && 
            !filterState.chocolateSelected && 
            filterState.mousseSelected &&
            filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.chocolate == !true
              });
          } else if (
            !filterState.vegetarianSelected && 
            filterState.chocolateSelected && 
            filterState.mousseSelected &&
            filterState.nutsSelected) {
              this.allProducts = products.filter((product)=>{
                return product.vegetarian == !true
              });
          }
        });
    });
    openFilterModal.present();
  }
}