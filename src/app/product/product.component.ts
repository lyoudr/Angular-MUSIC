import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<any> = [];

  constructor(
    private productService: ProductService,
    private sharedService : SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.toggle_is_loading(true);
    // Get all user products
    this.productService.getProducts(1, 5, undefined)
      .subscribe((resp : any) => {
        const data = resp['result_data']['data'];
        if(data.length){
          this.products = data.length ? data : [];
        }
        this.sharedService.toggle_is_loading(false);
      });
    
  }

}
