import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { filter, map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(filterCategories?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (filterCategories) {
      params = params.append('categories', filterCategories.join(','));
    }
    return this.http.get<Product[]>(`${this.apiURL}products`, { params: params });
  }
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiURL}products/`, productData);
  }
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURL}products/${productId}`);
  }
  updateProduct(productId: string, productData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}products/${productId}`, productData);
  }
  deleteProduct(productId: string): Observable<Product> {
    return this.http.delete<Product>(`${this.apiURL}products/${productId}`);
  }
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURL}products/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }
  getFeaturedProduct(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiURL}products/get/featured/${count}`);
  }
  uploadGalleryImages(productId: string, productData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}products/gallery-images/${productId}`, productData)
  }
}
