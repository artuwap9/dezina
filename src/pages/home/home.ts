import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
/*import { Http } from "@angular/http";*/
import "rxjs/add/operator/map"
import { ProductProvider } from "../../providers/product/product"
import { ProductDetailsPage } from "../product-details/product-details";
import { FilterModalPage } from "../../pages/filter-modal/filter-modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts = [];

  private femaleSelected = true;
  private maleSelected = true;

  constructor(private modalController: ModalController, private productProvider: ProductProvider, /*private http: Http,*/ public navCtrl: NavController) {

  }

  ionViewDidLoad(){
    this.productProvider.getProducts()
      .subscribe((Response) => {
        this.allProducts = Response as any;
      });
  }

  goToProductDetailPage(product){
    this.navCtrl.push(ProductDetailsPage, {
      productDetails: product
    });
  }

  openFilterModal(){
    let filterStateFromPage = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected,
    };

    let openFilterModal = this.modalController.create(FilterModalPage, filterStateFromPage);
    openFilterModal.onDidDismiss((filterState)=>{

      this.femaleSelected = filterState.femaleSelected;
      this.maleSelected = filterState.maleSelected;

      this.productProvider.getProducts()
        .subscribe((allProducts)=> {
          let products = allProducts;
          if (filterState.maleSelected && filterState.femaleSelected) {
            this.allProducts = products as any;
            return;
          } else if (!filterState.maleSelected && !filterState.femaleSelected) {
            this.allProducts = [] as any;
            return;
          } else if (!filterState.maleSelected && filterState.femaleSelected) {
            this.allProducts = products.filter((product)=>{
              return product.gender !== "male";
            });
          } else {
            this.allProducts = products.filter((product)=>{
              return product.gender !== "female";
            });
          }
        });
    });
    openFilterModal.present();
  }

}