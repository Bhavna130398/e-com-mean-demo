import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'libs/orders/services/cart.service';
import { ProductsService } from '@eshop-frontend/product';
import { CartItemDetailed } from '../../models/cart';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './cart-page.component.html',
  styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartItemDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  destroy$: Subject<any> = new Subject();

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }
  _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.destroy$)).subscribe((respCart) => {
      this.cartItemDetailed = [];
      this.cartCount = respCart.items?.length ?? 0;
      respCart.items?.forEach((cartItem) => {
        this.productService.getProductById(cartItem.productId as string).subscribe((product) => {
          this.cartItemDetailed.push({ product: product, quantity: cartItem.quantity });
        });
      });
    });
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
  deleteCartItem(productId: string) {
    this.cartService.deleteCartItem(productId);
  }
  updateCartItemQty(event: any, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event?.value
      },
      true
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
  }
}
