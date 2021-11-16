import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {
  
  productForm = this.fb.group({
    blogpost_id : ['1'], // default value
    product_name : [''],
    product_type_id : ['1'],
    description : [''],
    price : [''],
  });
  md_success : boolean = false;
  submit_text : Object = {
    'btn': 'create',
    'info': 'You have successfully create one product.'
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService : ProductService,
    private cookieService : CookieService,
  ) { }

  ngOnInit(): void {}

  onSubmit(form_value: any){
    let data = form_value;
    data['owner_id'] = this.cookieService.get('user_id');
    this.productService.postProduct(form_value)
      .subscribe((resp: any) => {
        if(resp['return_code'] == '0000'){
          this.md_success = true;
          setTimeout(() => {
            this.md_success = false;
          }, 3000);
          this.router.navigate(['/product']);
        }
      });
  }
}
