import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { OrderItems } from '../../models/orderItem';
import { Order } from '../../models/order';
import { CartService } from 'libs/orders/services/cart.service';
import { Cart } from '../../models/cart';
// const ORDER_STATUS = {
//   0: {
//     label: 'Pending',
//     color: 'primary'
//   },

//   1: {
//     label: 'Processed',
//     color: 'warning'
//   },
//   2: {
//     label: 'Shipped',
//     color: 'success'
//   },
//   3: {
//     label: 'Delivered',
//     color: 'success'
//   },
//   4: {
//     label: 'Failed',
//     color: 'danger'
//   }
// };
@Component({
  selector: 'eshop-frontend-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: []
})
export class CheckoutPageComponent implements OnInit {
  form!: FormGroup;
  countries: any = [];
  orderItems: OrderItems[] = [];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
    this._getCountries();
    this._getCartItems();
  }
  backToCart() {
    this.router.navigate(['/cart']);
  }
  private _getCountries() {
    this.orderService.getCountiesJSON().subscribe((res) => {
      this.countries = res;
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.form.value.street,
      shippingAddress2: this.form.value.apartment,
      city: this.form.value.city,
      zip: this.form.value.zip,
      country: this.form.value.country,
      phone: this.form.value.phone,
      status: 0,
      user: '63ca40d2912f7d7adc802f49',
      dateOrdered: `${Date.now()}`
    };
    this.orderService.createOrder(order).subscribe((orderRes) => {
      this.router.navigate(['/thank-you']);
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    if (cart) {
      cart.items?.map((obj: any) => {
        this.orderItems.push({
          product: obj?.productId,
          quantity: obj?.quantity
        });
      });
    }
  }
}
