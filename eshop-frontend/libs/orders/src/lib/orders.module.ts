import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartService } from 'libs/orders/services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent
  ],
  exports: [
    CartIconComponent
  ]
})
export class OrdersModule {
  constructor(cartService: CartService) {
    cartService.initCartLocalStorage();
  }
}
