import { Component, inject } from '@angular/core';
import { HomeProductsComponent } from "./home-products/home-products.component";
import { IProducts } from '../../../Core/Interfaces/products/IProducts';
import { ProductsService } from '../../../Core/Services/products/products.service';
import { HeroBannerHomeComponent } from "./hero-banner-home/hero-banner-home.component";
import { HeroSecoundBannerHomeComponent } from "./hero-secound-banner-home/hero-secound-banner-home.component";
import { ToastrService } from 'ngx-toastr';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-home',
  imports: [ HomeProductsComponent, HeroBannerHomeComponent, HeroSecoundBannerHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
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

