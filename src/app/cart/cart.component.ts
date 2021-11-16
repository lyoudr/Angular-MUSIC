import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/services/cart.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  orders : any = [];
  length : number = 0;
  total_price: number = 0;

  constructor(
    private router : Router,
    private cartService : CartService,
    private sharedService : SharedService,
  ) { }

  ngOnInit(): void {
    this.sharedService.toggle_is_loading(true);
  
    // Get all order_infos
    this.cartService.getOrderInfos(1, 10)
      .subscribe(
        (resp: any) => {
          this.orders = resp['result_data']['data'] ? resp['result_data']['data']: [];
          if (this.orders){
            for (let i = 0; i < this.orders.length; i++){
              this.length += this.orders[i]['order_infos'].length;
              this.total_price += this.orders[i]['total_price']
            }
          };
          // define order numbers in cart
          this.sharedService.order_num.next(this.length);
          this.sharedService.toggle_is_loading(false);
        },
        (error) => {
          if (error['status'] == 401){
            this.sharedService.toggle_is_loading(false);
            this.router.navigate(['/login']);
          }
        }
      );
  }

  delete_order(order_id: any){
    this.sharedService.toggle_is_loading(true);
    this.cartService.deleteOrderInfo(order_id)
      .subscribe((resp: any) => {
        this.orders = resp['result_data'];
        this.sharedService.toggle_is_loading(false);
      })
  }
}
