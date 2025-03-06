import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducts } from '../../Interfaces/products/IProducts';
import { Website_Base_Url } from '../../Constants/Website_Base_Url';
import { IProductDetails } from '../../Interfaces/products/IProductDetails';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<IProducts>{
    return this.http.get<IProducts>(`${Website_Base_Url}/api/v1/products`);
  }

  getProductDetails(id:string):Observable<IProductDetails>{
    return this.http.get<IProductDetails>(`${Website_Base_Url}/api/v1/products/${id}`)
  }

}
