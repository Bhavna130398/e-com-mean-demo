import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
// import { environment } from '../../../../../environments/environment';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiURL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiURL}categories`);
  }
  getCategoriesById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURL}categories/${categoryId}`);
  }
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiURL}categories`, category);
  }
  deleteCategory(categoryId: string): Observable<Category> {
    return this.http.delete<Category>(`${this.apiURL}categories/${categoryId}`);
  }
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURL}categories/${category.id}`, category);
  }
}
