import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@eshop-frontend/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

const ORDER_STATUS = [
  { key: 0, label: 'Pending', color: 'primary' },
  { key: 1, label: 'Processed', color: 'warning' },
  { key: 2, label: 'Shipped', color: 'success' },
  { key: 3, label: 'Delivered', color: 'success' },
  { key: 4, label: 'Failed', color: 'danger' }
];
@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: []
})
export class OrderDetailsComponent {
  order: any;
  status: any;
  selectedStatus: any;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {
    this.status = ORDER_STATUS;
    this._checkId();
  }

  _getOrderById(orderId) {
    this.orderService.getOrderById(orderId).subscribe((order: any) => {
      this.order = order;
      this.selectedStatus = this.order.status;
    });
  }
  _checkId() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this._getOrderById(params['id']);
      }
    });
  }
  onStatusChange(event) {
    this.orderService.updateOrderStatus(this.order.id, event.value).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Status',
          detail: 'Status is updated!'
        });
        timer(3000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Status',
          detail: 'Status is not updated!'
        });
      }
    );
  }
}
