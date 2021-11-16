import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm : any;
  md_success : boolean = false;
  submit_text : Object = {
    'btn': 'update',
    'info': 'You have successfully update one product.'
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private productService : ProductService,
    private cookieService : CookieService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      // 1. get product detail
      this.productService.getProducts(undefined, undefined, id)
        .subscribe((resp: any) => {
          let product = resp['result_data'];
          this.productForm = this.fb.group({
            product_id : [id], 
            blogpost_id : [product['blogpost_id']], // default value
            product_name : [product['product_name']],
            product_type_id : [product['product_type_id']],
            description : [product['description']],
            price : [product['price']],
          });
        });
    });
  }
  onSubmit(form_value : any){
    let data = form_value;
    data['owner_id'] = this.cookieService.get('user_id');
    this.productService.updateProduct(data)
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
