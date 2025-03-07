import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../Core/Services/cart/cart.service';
import { ICart } from '../../../Core/Interfaces/cart/icart';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingDataComponent } from '../../../Shared/Components/loading-data/loading-data.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cart',
  // Preserve your original imports.
  imports: [CurrencyPipe, RouterLink,LoadingDataComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('500ms {{delay}}ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateX(0)' }))
      ], { params: { delay: 0 }})
    ])
  ]
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly spinner = inject(NgxSpinnerService);

  // Initialize cartDetails (adjust default as needed) and a loading flag.
  cartDetails: ICart = {} as ICart;
  loading: boolean = true;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this.spinner.show('cartSpinner');
    this.cartService.getLoggedUserCart().subscribe({
      next: response => {
        this.cartDetails = response.data;
        this.loading = false;
        this.spinner.hide('cartSpinner');
      },
      error: err => {
        console.error(err);
        this.toastrService.error('Failed to load cart data');
        this.loading = false;
        this.spinner.hide('cartSpinner');
      }
    });
  } 

  deleteItem(id: string): void {
    this.cartService.removeSpecificItem(id).subscribe({
      next: response => {
        this.cartDetails = response.data;
        if (response.status === 'success') {
          // Display a detailed alert message for removal.
          const alertMsg = response.message || 'Item removed successfully!';
          this.toastrService.success(alertMsg);
          this.cartService.cartNumber.set(response.numOfCartItems);
        }
      },
      error: err => {
        console.error(err);
        this.toastrService.error('Failed to remove item');
      }
    });
  }

  changeProductCount(id: string, count: number): void {
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: response => {
        this.cartDetails = response.data;
        if (response.status === 'success') {
          // Display a detailed alert message for quantity update.
          const alertMsg = response.message || `Quantity updated`;
          this.toastrService.success(alertMsg);
        }
      },
      error: err => {
        console.error(err);
        this.toastrService.error('Failed to update product count');
      }
    });
  }

  clearItems(): void {
    this.cartService.clearCart().subscribe({
      next: response => {
        if (response.status === 'success') {
          this.cartDetails = {} as ICart;
          // Display a detailed alert message for cart clearance.
          const alertMsg = response.message || 'Cart cleared successfully!';
          this.toastrService.success(alertMsg);
          this.cartService.cartNumber.set(0);
        }
      },
      error: err => {
        console.error(err);
        this.toastrService.error('Failed to clear cart');
      }
    });
  }

  // Updated trackBy function to avoid duplicate keys.
  trackByProductId(index: number, item: any): string {
    return item.product._id + '-' + index;
  }
}
