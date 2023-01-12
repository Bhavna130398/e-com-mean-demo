import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../src/lib/models/cart';

export const CART_KEY = 'cart'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  initCartLocalStorage() {
    const cart = this.getCart();
    if (!cart) {
      const initCart = {
        items: []
      }
      localStorage.setItem('cart', JSON.stringify(initCart));
    }
  }

  getCart(): Cart {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cartJsonString: Cart = JSON.parse(localStorage.getItem(CART_KEY)!);
    return cartJsonString;
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items?.map(item => {
        if (item.productId === cartItem.productId) {
          if (item.quantity != undefined && cartItem.quantity != undefined)
            item.quantity = item.quantity + cartItem.quantity;
        }
      })
    } else {
      cart.items?.push(cartItem);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }
}
