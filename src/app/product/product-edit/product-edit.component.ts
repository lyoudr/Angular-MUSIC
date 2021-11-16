import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BlogService } from 'src/services/blog.service';
import { ProductService } from 'src/services/product.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  posts : Array<any> = [];
  product_types: Array<any> = [];
  productForm : any;
  update_success : boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute : ActivatedRoute,
    private productService : ProductService,
    private blogService : BlogService,
    private cookieService : CookieService,
    private sharedService : SharedService,
  ) { }

  ngOnInit(): void {
    this.sharedService.toggle_is_loading(true);
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
      
      // 2. get blog post
      this.blogService.getUserBlogPost(1, 10)
        .subscribe((resp: any) => {
          this.posts = resp['data'];
          this.sharedService.toggle_is_loading(false);
        });
      // 3. get product types
      this.productService.getProductTypes()
        .subscribe((resp: any) => this.product_types = resp['result_data']);
    });
  }
  onSubmit(){
    console.log('this.productForm.value is =>', this.productForm.value);
    let data = this.productForm.value;
    data['owner_id'] = this.cookieService.get('user_id');
    this.productService.updateProduct(data)
      .subscribe((resp: any) => {
        if(resp['return_code'] == '0000'){
          this.update_success = true;
          setTimeout(() => {
            this.update_success = false;
          }, 3000);
        }
      });
  }
}
