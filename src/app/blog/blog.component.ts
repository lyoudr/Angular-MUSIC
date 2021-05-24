import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../services/blog.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],

})

export class BlogComponent implements OnInit {
  classes : Array<{id: number, name: string}> = [];
  selected_class : Array<any> = [];
  posts : any = [];
  host : string = environment.apiUrl;

  constructor(
    private blogService : BlogService
  ) { }

  ngOnInit(): void {
    // Get classes of blog
    this.blogService.getClasses(1, 5)
      .subscribe((resp : any) => this.classes = resp['data'])
    
    // Get blog posts
    this.blogService.getBlogPost(1, 10, this.selected_class)
      .subscribe((resp : any) => {
        this.posts = resp['data'];
      });
  }

  select_class(item : any){
    
    let index_x = this.selected_class.indexOf(item);
    if(index_x != -1){
      this.selected_class.splice(index_x, 1);
    } else {
      this.selected_class.push(item)
    }
    this.blogService.getBlogPost(1, 5, this.selected_class)
      .subscribe((resp : any) => this.posts = resp['data'])
  }
}
