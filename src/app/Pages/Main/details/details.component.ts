import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../Core/Services/products/products.service';
import { IProductDetails } from '../../../Core/Interfaces/products/IProductDetails';
import { LoadingDataComponent } from '../../../Shared/Components/loading-data/loading-data.component';
import { CurrencyPipe } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { CartService } from '../../../Core/Services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-details',
  imports: [LoadingDataComponent, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInSection', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1 }))
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
export class DetailsComponent implements OnInit, OnDestroy {
  private activeRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  toastrService = inject(ToastrService);
  title = inject(Title);
  meta = inject(Meta);

  currentProduct!: IProductDetails;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe({
      next: response => {
        const id = response.get("id") as string;
        this.getCurrentProduct(id);
      }
    });
  }

  getCurrentProduct(id: string): void {
    this.productsService.getProductDetails(id).subscribe({
      next: response => {
        this.currentProduct = response;
        this.title.setTitle('Fresh Cart ' + response.data.title);
        this.meta.addTag({
          name: 'description',
          content: response.data.description
        });
      },
      error: err => {
        console.error('Error fetching product details:', err);
      }
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: response => {
        if (response.status === 'success') {
          this.toastrService.success(response.message);
          this.cartService.cartNumber.set(response.numOfCartItems);
        }
      },
      error: err => {
        console.error(err);
        this.toastrService.error('Failed to add product to cart');
      }
    });
  }

  ngOnDestroy(): void {
    this.meta.addTag({
      name: 'description',
      content: ''
    });
  }
}
