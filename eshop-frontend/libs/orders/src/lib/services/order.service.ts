import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiURL}orders/`);
  }
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURL}orders/${orderId}`);
  }
  createCategory(category: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiURL}orders`, category);
  }
  deleteOrder(orderId: string): Observable<Order> {
    return this.http.delete<Order>(`${this.apiURL}orders/${orderId}`);
  }
  updateCategory(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiURL}orders/${order.id}`, order);
  }
  updateOrderStatus(orderId: string, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURL}orders/${orderId}`, { status: status })
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURL}orders/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }
  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURL}orders/get/count`)
      .pipe(map((objectValue: any) => objectValue.ordersCount));
  }
}
