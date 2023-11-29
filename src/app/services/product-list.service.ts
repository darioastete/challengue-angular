import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductListService {
    productDeleted = new EventEmitter<void>();

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

  createProduct(product:Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/bp/products`, product);
  }

  deleteProduct(id:string) : Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/bp/products?id=${id}`, {responseType:'text' as 'json'})
  }

  verifyProductId(id: string): Observable<boolean> {
    const url = `${environment.apiUrl}/bp/products/verification?id=${id}`;
    return this.http.get<boolean>(url);
  }
}
