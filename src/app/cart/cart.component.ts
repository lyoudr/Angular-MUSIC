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
  pay_infos : any = [];
  pay_info : any = {};
  show_pay_info : boolean = false;
  t_pay : boolean = false;
  n_pay : boolean = false;
  ship_addr : string = '';
  validate_err : boolean = false;

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
            this.count_len_pri(this.orders)
          };
          // define order numbers in cart
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

  count_len_pri(data: any){
    let length = 0;
    let total_price = 0;
    for (let i = 0; i < data.length; i++){
      length += data[i]['order_infos'].length;
      total_price += data[i]['total_price'];
      this.length = length;
      this.total_price = total_price;
    }
    this.sharedService.order_num.next(this.length);
  }

  delete_order(order_id: any){
    this.sharedService.toggle_is_loading(true);
    this.cartService.deleteOrderInfo(order_id)
      .subscribe((resp: any) => {
        this.orders = resp['result_data'];
        this.count_len_pri(this.orders)
        this.sharedService.toggle_is_loading(false);
      })
  }

  set_pay_info(event: Event){
    // this.pay_info = this.pay_infos[index];
    let index = (event.target as HTMLInputElement).value;
    this.pay_info = this.pay_infos[index];
    console.log('this.pay_info is =>', (event.target as HTMLInputElement).value);
  }

  order(){
    // 1. Get user pay info
    this.cartService.getPayInfo().subscribe((resp: any) => {
      const data = resp['result_data'];
      if (data.length != 0) {
        this.pay_infos = data;
        this.pay_info = this.pay_infos[0];
        this.show_pay_info = true;
        this.t_pay = true;
      } else {
        // 2. Ask user to create pay info
        this.show_pay_info = true;
        this.n_pay = true;
      };
    });
  }

  make_order(value: string){
    if (!value){
      this.validate_err = true;
      return ;
    }
    let data = {
      'pay_info_id': this.pay_info.id,
      'ship_addr': value
    }
    this.sharedService.toggle_is_loading(true);
    this.cartService.createOrder(data)
      .subscribe((resp : any) => {
        console.log('resp is =>', resp);
        if (resp['return_code'] == '0000'){
          this.sharedService.toggle_is_loading(false);
          this.router.navigate(['/order']);
        }
      });
  }
}
