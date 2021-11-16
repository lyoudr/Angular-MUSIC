import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { BlogService } from 'src/services/blog.service';
import { ProductService } from 'src/services/product.service';
import { SharedService } from 'src/services/shared.service';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {

  posts : Array<any> = [];
  post_obj : any = {};
  product_types: Array<any> = [];
  blog_post_display : any = {};
  add_success : boolean = false;
  productForm = this.fb.group({
    blogpost_id : ['1'], // default value
    product_name : [''],
    product_type_id : ['1'],
    description : [''],
    price : [''],
  })

  constructor(
    private fb: FormBuilder,
    private blogService : BlogService,
    private productService : ProductService,
    private sharedService : SharedService,
    private cookieService : CookieService,
  ) { }

  ngOnInit(): void {
    this.sharedService.toggle_is_loading(true);
    this.blogService.getUserBlogPost(1, 10)
      .subscribe((resp: any) => {
        this.posts = resp['data'];
        this.post_obj = this.posts.reduce((acc, cur) =>({...acc, [cur.id.toString()]: cur}), {});
        // set default blog post display
        this.set_blog('1');
        this.sharedService.toggle_is_loading(false);
      });
    this.productService.getProductTypes()
      .subscribe((resp: any) => this.product_types = resp['result_data']);
  }

  set_blog(post: any){
    this.blog_post_display = this.post_obj[post];
  }

  onSubmit(){
    let data = this.productForm.value;
    data['owner_id'] = this.cookieService.get('user_id');
    console.log('data is =>', data);
    this.productService.postProduct(this.productForm.value)
      .subscribe((resp: any) => {
        if(resp['return_code'] == '0000'){
          this.add_success = true;
          setTimeout(() => {
            this.add_success = false;
          }, 3000);
        }
      });
  }
}
