import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'libs/orders/services/cart.service';
import { CartItem } from 'libs/orders/src/lib/models/cart';
import { MessageService } from 'primeng/api';
import { Product } from '../../models/product';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-items.component.html',
  styles: [
  ]
})
export class ProductItemsComponent implements OnInit {
  @Input() product!: Product
  constructor(private cartService: CartService, private messageService: MessageService) {

  }

  ngOnInit(): void {
  }
  addProductToCart() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Product is successfully added to cart!'
    });
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }
}
