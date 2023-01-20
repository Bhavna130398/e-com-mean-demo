import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@eshop-frontend/product';
import { CartService } from 'libs/orders/services/cart.service';
import { take } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'eshop-frontend-order-summary',
  templateUrl: './order-summary.component.html',
  styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice = 0;
  destroy$ = new Subject<any>();
  isCheckout = false;
  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router
  ) {
    if (router.url.includes('checkout')) {
      this.isCheckout = true;
    }
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }
  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.destroy$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item: any) => {
          this.productService
            .getProductById(item.productId as string)
            .pipe(take(1))
            .subscribe((product: any) => {
              this.totalPrice += product?.price * item?.quantity;
            });
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
  }
}
