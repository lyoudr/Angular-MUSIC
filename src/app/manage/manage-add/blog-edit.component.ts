
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/services/blog.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  classes : any = [];
  post_type : string = 'post'; // 'post' or 'section'
  post_form = new FormData(); // post form data
  
  post_sections : Array<any> = [new FormData()]; // section form data
  blogpost_id : number = 0; // post id refered by section
  sections : Array<{
    'type': string, 
    'photo': string,
    'edit': boolean
  }> = [{'type': 'text', 'photo': 'upload', 'edit': true}]; // number of sections
  section_types : Array<any> = ['text', 'photo', 'video']; // section type
  host : string = 'http://127.0.0.1:5000'; // host url

  @ViewChild('post_area') post_area!: ElementRef;
  @ViewChild('section_area') section_area!: ElementRef;
  

  constructor(
    private blogService : BlogService,
    private cookieService: CookieService,
    private router : Router
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

  /* 1. Post Form */

  // set post form
  set_form(input: any){
    this.post_form.set(
      input.name, 
      input.type == 'file' ? input.files[0] : input.value
    );
  }

  // submig post form
  submit_post(){
    this.blogService.postBlogPost(this.post_form)
      .subscribe((data : any) => {
        this.blogpost_id = data['blogpost_id'];
        this.post_type = 'section';
        this.init_section(0);
      });
  }

  /* 2. Section */
  // add section form
  init_section(index : number){
    // Initialize post section
    this.post_sections[index].append('blogpost_id', this.blogpost_id.toString())
    this.post_sections[index].append('post_type', 'text');
    for(const index_sec in this.section_types){
      this.post_sections[index].append(this.section_types[index_sec], '');
    }
  }

  add_section(){
    this.sections.push({'type': 'text', 'photo': 'upload', 'edit': true});
    this.post_sections.push(new FormData());
    this.init_section(this.post_sections.length - 1);
  }

  // set section form
  set_section(name: string, input: any, index : number){
    if (name == 'photo') {
      this.sections[index]['photo'] = input.files[0].name;
    }
    if (name == 'post_type'){
      this.sections[index]['type'] = input.value;
    }
    this.post_sections[index].set(name, input.files ? input.files[0] : input.value);
  }

  // submit section form
  submit_section(index : number){
    this.blogService.postBlogSection(this.post_sections[index])
      .subscribe((data: any) => {
        this.post_sections[index] = data;
        this.sections[index]['edit'] = false;
      });
  }

  /* Finish */
  finish_edit(){
    this.router.navigateByUrl('/blog');
  }
}
