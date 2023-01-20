import { Component, OnInit } from '@angular/core';
import { OrderService } from '@eshop-frontend/orders';
import { ProductsService } from '@eshop-frontend/product';
import { UsersService } from '@eshop-frontend/users';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  statistics = [];
  constructor(
    private orderService: OrderService,
    private productService: ProductsService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.orderService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.orderService.getTotalSales()
    ]).subscribe((values) => {
      this.statistics = values;
    });
  }
}
