
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/services/blog.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  classes : any = [];
  post_type : string = 'post';
  post_form = new FormData();
  post_section = new FormData();
  e_section_type : string = 'text';
  section_types : Array<any> = ['text', 'photo', 'video'];
  blogpost_id : number = 0;
  
  @ViewChild('main_post') main_post: ElementRef;
  @ViewChild('section_form') section_form: ElementRef;

  constructor(
    private blogService : BlogService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.blogService.getClasses()
      .subscribe(data => this.classes = data);
    // set initial class
    this.post_form.set('user_id', this.cookieService.get('user_id'));
    this.post_form.set('blogclass_id', '1');
  }

  turn_to_num(value : any){
    return Number(value);
  }

  set_form(input: any){
    this.post_form.set(
      input.name, 
      input.type == 'file' ? input.files[0] : input.value
    );
  }

  set_section(input : any){
    if(input.name == 'post_type') {
      this.e_section_type = input.value;
    }
    this.post_section.set(
      input.name,
      input.type == 'file' ? input.files[0] : input.value
    )
  }

  add_section(){
    this.main_post.nativeElement.appendChild(
      this.section_form.nativeElement.cloneNode(true)
    )
  }

  submit_post(){
    this.blogService.postBlogPost(this.post_form)
      .subscribe((data : any) => {
        this.blogpost_id = data['blogpost_id'];
        this.post_type = 'section';
        
        // Initialize post section
        this.post_section.append('blogpost_id', this.blogpost_id.toString())
        this.post_section.append('post_type', 'text');
        for(const index in this.section_types){
          this.post_section.append(this.section_types[index], '');
        }
      });
  }

  submit_section(){
    this.blogService.postBlogSection(this.post_section)
      .subscribe((data: any) => {
        console.log('data is =>', data);
      });
  }
}
