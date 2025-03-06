import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingDataComponent } from "../../../Shared/Components/loading-data/loading-data.component";
import { HomeProductsComponent } from "./home-products/home-products.component";
import { IProducts } from '../../../Core/Interfaces/products/IProducts';
import { ProductsService } from '../../../Core/Services/products/products.service';
import { HeroBannerHomeComponent } from "./hero-banner-home/hero-banner-home.component";
import { HeroSecoundBannerHomeComponent } from "./hero-secound-banner-home/hero-secound-banner-home.component";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [LoadingDataComponent, CurrencyPipe, RouterLink, HomeProductsComponent, HeroBannerHomeComponent, HeroSecoundBannerHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
allProducts!:IProducts
private readonly productsService=inject(ProductsService);


 ngOnInit(): void {
   this.getAllProducts()
 }

 getAllProducts():void{
    this.productsService.getAllProducts().subscribe(
      {
        next:response => {
          console.log(response);
          this.allProducts=response;
        },
        error :err=>{
          console.log(err);
        }
      }
    )
 }
 
 

}

