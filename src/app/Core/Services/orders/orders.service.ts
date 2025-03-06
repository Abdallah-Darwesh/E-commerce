import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private myToken: string = localStorage.getItem('userToken') || '';

  constructor(private httpClient: HttpClient) {}

  // POST to create a checkout session.
  checkOutPayment(id: string, data: object): Observable<any> {
    return this.httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress: data },
      {
        headers: {
          token: this.myToken
        }
      }
    );
  }
}
