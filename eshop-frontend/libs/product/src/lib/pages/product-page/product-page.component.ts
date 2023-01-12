import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'libs/orders/services/cart.service';
import { CartItem } from 'libs/orders/src/lib/models/cart';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'eshop-frontend-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit {
  products!: Product;
  quantity: number = 1;
  constructor(private prodService: ProductsService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productId']) {
        this._getProduct(params['productId']);
      }
    })
  }
  private _getProduct(id: string) {
    this.prodService.getProductById(id).subscribe(response => {
      this.products = response;
    })
  }
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.products.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }
}
