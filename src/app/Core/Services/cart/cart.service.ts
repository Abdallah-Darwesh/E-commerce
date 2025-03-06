import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient: HttpClient) {
    effect(() =>{
      
    })
  }

  cartNumber:WritableSignal<number> = signal(0);

  // Always fetch the latest token from local storage.
  private get token(): string {
    return localStorage.getItem('userToken') || '';
  }

  // POST: Add Product To Cart
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId: id },
      {
        headers: {
          token: this.token
        }
      }
    );
  }

  // GET: Get Logged User Cart
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: {
          token: this.token
        }
      }
    );
  }

  // DELETE: Remove specific cart item
  removeSpecificItem(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token: this.token
        }
      }
    );
  }

  // PUT: Update product quantity in cart
  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: newCount },
      {
        headers: {
          token: this.token
        }
      }
    );
  }

  // DELETE: Clear the user cart
  clearCart(): Observable<any> {
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        headers: {
          token: this.token
        }
      }
    );
  }
}
