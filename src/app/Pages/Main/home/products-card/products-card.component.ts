import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingDataComponent } from '../../../../Shared/Components/loading-data/loading-data.component';
import { IProducts } from '../../../../Core/Interfaces/products/IProducts';
import { CartService } from '../../../../Core/Services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products-card',
  // Keep your original imports if needed
  imports: [LoadingDataComponent, CurrencyPipe, RouterLink, NgxSpinnerComponent],
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  // The product input should match your IProducts interface.
  @Input() product!: IProducts;

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: response => {
        console.log(response);
        if (response.status === 'success') {
          this.toastrService.success(response.message);
          this.cartService.cartNumber.set(response.numOfCartItems) ;
        }
      },
      error: err => {
        console.error(err);
        this.toastrService.error('Failed to add product to cart');
      }
    });
  }
}
