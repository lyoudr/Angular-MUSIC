import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { BlogService } from 'src/services/blog.service';
import { ProductService } from 'src/services/product.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {

  @Input() productForm : any;
  @Input() md_success : any; 
  @Input() submit_text : any;
  @Output() submitForm = new EventEmitter<any>();

  posts : Array<any> = [];
  post_obj : any = {};
  product_types: Array<any> = [];
  blog_post_display : any = {};
  modify_success : boolean = false;

  constructor(
    private blogService : BlogService,
    private productService : ProductService,
    private sharedService : SharedService,
  ) { }

  ngOnInit(): void { 
    this.sharedService.toggle_is_loading(true);
    this.blogService.getUserBlogPost(1, 10)
      .subscribe((resp: any) => {
        this.posts = resp['data'];
        console.log('this.posts is =>', this.posts);
        this.post_obj = this.posts.reduce((acc, cur) =>({...acc, [cur.id.toString()]: cur}), {});
        // set default blog post display
        if (Object.keys(this.post_obj).length){
          this.set_blog(Object.keys(this.post_obj)[0]);
        }
        this.sharedService.toggle_is_loading(false);
      }); 
    this.productService.getProductTypes()
      .subscribe((resp: any) => {
        this.product_types = resp['result_data'];
        this.sharedService.toggle_is_loading(false);
      });
  }

  set_blog(post: any){
    console.log('post is =>', post)
    this.blog_post_display = this.post_obj[post];
  }

  onSubmit(){
    this.submitForm.emit(this.productForm.value)
  }
}
