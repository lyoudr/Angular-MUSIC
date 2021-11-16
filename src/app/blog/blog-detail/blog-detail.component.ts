import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { BlogService } from 'src/services/blog.service';
import { CartService } from 'src/services/cart.service';
import { SharedService } from 'src/services/shared.service';
import { CookieService } from 'ngx-cookie-service';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  
  host : string = environment.apiUrl;
  post : any = {};
  sections : any = [];
  count : number = 1;
  login_no : boolean = false;
  add_success : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private blogService : BlogService,
    private sharedService : SharedService,
    private cookieService : CookieService,
    private cartService : CartService,
    private sanitizer : DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sharedService.toggle_is_loading(true);

    // Get the blog post id from the current route
    const post_id = this.route.snapshot.paramMap.get('post_id');
    
    this.blogService.getBlogDetailPost(post_id)
      .subscribe(data => {
        this.post = data;
        this.sections = this.post.blog_section;
        this.sharedService.toggle_is_loading(false);
      })
  }

  video_URL(url : any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  md_count(num: number){
    var new_count = this.count + num;
    if (new_count >= 1 && new_count <= 10){
      this.count = new_count;
    }
  }

  add_to_cart(product_id : number, product_type_id: number){
    // 1. check if user logged in
    // 2. If user is logged in
    console.log('this.cookieService.get("access_token") is =>', this.cookieService.get('access_token'));
    if(this.cookieService.get('access_token')){
      var data = {
        'product_type_id': product_type_id,
        'product_id': product_id,
        'count': this.count
      }
      this.cartService.postOrderInfo(data)
        .subscribe((resp : any) => {
          if(resp['return_code'] == '0000'){
            this.add_success = true;
            setTimeout(() => {
              this.add_success = false;
            }, 3000);
          }
        })
    } else {
      this.login_no = true;
    }
  }
}
