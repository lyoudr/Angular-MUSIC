import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from 'src/services/blog.service';
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

  constructor(
    private route : ActivatedRoute,
    private blogService : BlogService,
    private sanitizer : DomSanitizer
  ) { }

  ngOnInit(): void {
    // Get the blog post id from the current route
    const post_id = this.route.snapshot.paramMap.get('post_id');
    
    this.blogService.getBlogDetailPost(post_id)
      .subscribe(data => {
        this.post = data;
        this.sections = this.post.blog_section;
      })
  }

  video_URL(url : any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
