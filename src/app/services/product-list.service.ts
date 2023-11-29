import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private readonly http:HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/bp/products`);
  }

  searchProducts(products: Product[], query: string): Product[] {
    if (!query.trim()) {
      return products
    }

    const lowercaseQuery = query.toLowerCase();
    return products.filter((product) => {
      return (
      product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery)
      )
    })
  }
}
