import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../src/lib/models/cart';

export const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  initCartLocalStorage() {
    const cart = this.getCart();
    if (!cart) {
      const initCart = {
        items: []
      };
      localStorage.setItem('cart', JSON.stringify(initCart));
    }
  }

  getCart(): Cart {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const cartJsonString: Cart = JSON.parse(localStorage.getItem(CART_KEY)!);
    return cartJsonString;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items?.find((item: any) => item.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items?.map((item: any) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem?.quantity;
          } else {
            item.quantity = item?.quantity + cartItem?.quantity;
          }
        }
      });
    } else {
      cart.items?.push(cartItem);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cart$.next(cart);
    return cart;
  }
  deleteCartItem(productId: string) {
    const cart = this.getCart();
    if (cart) {
      const newCart = cart.items?.filter((item) => item.productId !== productId);
      cart.items = newCart;
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      this.cart$.next(cart);
    }
  }
}
