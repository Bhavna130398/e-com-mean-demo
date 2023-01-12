import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@eshop-frontend/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

const ORDER_STATUS = [
  {
    label: 'Pending',
    color: 'primary'
  },
  {
    label: 'Processed',
    color: 'warning'
  },
  {
    label: 'Shipped',
    color: 'success'
  },
  {
    label: 'Delivered',
    color: 'success'
  },
  {
    label: 'Failed',
    color: 'danger'
  }
];
@Component({
  selector: 'admin-order-details',
  templateUrl: './order-details.component.html',
  styles: []
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  status = [];
  selectedStatus: any;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location
  ) {
    this.status = ORDER_STATUS;
    this._checkId();
    console.log('test');
  }

  ngOnInit(): void {}
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
  onstatusChange(event) {
    this.orderService.updateOrderStatus(this.order.id, event.value).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Status',
          detail: 'Status is updated!'
        });
        timer(3000)
          .toPromise()
          .then((done) => {
            this.location.back();
          });
        // this.order = response;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Status',
          detail: 'Status is not updated!'
        });
      }
    );
  }
}
