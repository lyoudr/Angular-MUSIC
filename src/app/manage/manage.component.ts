import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { BlogService } from 'src/services/blog.service';
import { SharedService } from 'src/services/shared.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  host : string = environment.apiUrl;
  posts : any = [];
  post_id : number = 0;
  is_pop: boolean = false;
  is_empty : boolean = false;

  constructor(
    private router : Router,
    private blogService : BlogService,
    private sharedService : SharedService,
  ) { }

  ngOnInit(): void {
    this.sharedService.toggle_is_loading(true);
    this.blogService.getUserBlogPost(1, 10)
      .subscribe((resp : any) => {
        if (resp == 'not found'){
          this.is_empty = true;
        }
        this.posts = resp['data'];
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
