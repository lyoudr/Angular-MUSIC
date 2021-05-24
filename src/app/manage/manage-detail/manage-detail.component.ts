import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from 'src/services/blog.service';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-manage-detail',
  templateUrl: './manage-detail.component.html',
  styleUrls: ['./manage-detail.component.scss']
})
export class ManageDetailComponent implements OnInit {
  host : string = environment.apiUrl;
  post : any = {};
  sections : any = [];

  constructor(
    private cookieService : CookieService,
    private route : ActivatedRoute,
    private blogService : BlogService,
    private sanitizer : DomSanitizer
  ) { }

  ngOnInit(): void {
    // Get the blog post id from the current route
    const post_id = this.route.snapshot.paramMap.get('post_id');
    this.blogService.getUserBlogDetailPost(post_id)
      .subscribe(data => {
        this.post = data;
        this.sections = this.post.blog_section;
      })
  }

  video_URL(url : any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
