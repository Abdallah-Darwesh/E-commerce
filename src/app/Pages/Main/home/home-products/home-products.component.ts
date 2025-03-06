import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingDataComponent } from '../../../../Shared/Components/loading-data/loading-data.component';
import { IProducts } from '../../../../Core/Interfaces/products/IProducts';
import { ProductsService } from '../../../../Core/Services/products/products.service';
import { ProductsCardComponent } from "../products-card/products-card.component";

@Component({
  selector: 'app-home-products',
   imports: [LoadingDataComponent,ProductsCardComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css'
})
export class HomeProductsComponent implements OnInit {
 allProducts!:IProducts
 productsService=inject(ProductsService);

 ngOnInit(): void {
   this.getAllProducts()
 }

 getAllProducts():void{
    this.productsService.getAllProducts().subscribe(
      {
        next:response => {
          console.log(response);
          this.allProducts=response;
        }
      }
    )
 }
}
