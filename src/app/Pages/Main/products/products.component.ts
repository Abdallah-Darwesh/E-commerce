import { Component } from '@angular/core';
import { HomeProductsComponent } from '../home/home-products/home-products.component';

@Component({
  selector: 'app-products',
  imports: [HomeProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
