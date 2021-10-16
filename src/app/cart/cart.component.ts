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

  order_infos : Array<any> = [];

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
          this.order_infos = resp['result_data']['data']
          console.log('this.order_infos.length is =>', this.order_infos.length)
          // define order numbers in cart
          this.sharedService.order_num.next(this.order_infos.length)
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
        this.order_infos = resp['result_data']['data'];
        this.sharedService.toggle_is_loading(false);
      })
  }
}
