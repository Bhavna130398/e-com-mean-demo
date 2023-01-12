import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartService } from 'libs/orders/services/cart.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {
  cartCount = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      const count = cart?.items?.length ?? 0;
      this.cartCount = count
    })
  }

}
