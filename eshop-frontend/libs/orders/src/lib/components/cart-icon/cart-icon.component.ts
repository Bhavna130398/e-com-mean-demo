import { Component, OnInit } from '@angular/core';
import { CartService } from 'libs/orders/services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: []
})
export class CartIconComponent implements OnInit {
  cartCount = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      const count = cart?.items?.length ?? 0;
      this.cartCount = count;
    });
  }
}
