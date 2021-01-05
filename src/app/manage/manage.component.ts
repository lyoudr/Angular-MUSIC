import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BlogService } from 'src/services/blog.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  host : string = environment.apiUrl;
  posts : any = {};
  post_id : number = 0;
  is_pop: boolean = false;

  constructor(
    private cookieService : CookieService,
    private blogService : BlogService
  ) { }

  ngOnInit(): void {
    const user_id = this.cookieService.get('user_id');
    this.blogService.getUserBlogPost(1, 10, null, user_id)
      .subscribe((resp : any) => this.posts = resp);
  }

  confirm_del(post_id: number){
    this.post_id = post_id;
    this.is_pop = true;
  }

  del_post(is_delete: any){
    if (is_delete){
      this.blogService.deleteBlogPost(this.post_id)
        .subscribe(data => {
          console.log('data is =>', data);
          this.is_pop = false;
        });
    }
    if (!is_delete){
      this.is_pop = false;
    }
  }

}
