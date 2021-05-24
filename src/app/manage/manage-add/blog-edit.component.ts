
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/services/blog.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  
  classes : any = [];
  post_type : string = 'post'; // 'post' or 'section'
  post_form = new FormData(); // post form data
  images_id : any = {}; // save images id which is uploaded to web

  post_sections : Array<any> = []; // section form data
  md_sections: Array<any> = [];
  blogpost_id : number = 0; // post id refered by section
  section_types : Array<any> = ['text', 'photo', 'video']; // section type
  host : string = environment.apiUrl; // host url

  @ViewChild('post_area') post_area!: ElementRef;
  @ViewChild('section_area') section_area!: ElementRef;
  

  constructor(
    private blogService : BlogService,
    private cookieService: CookieService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.blogService.getClasses(1, 5)
      .subscribe((resp : any) => {
        this.classes = resp['data'];
      });
    // set initial class
    this.post_form.set('user_id', this.cookieService.get('user_id'));
    this.post_form.set('blogclass_id', '1');
  }

  // turn_to_num(value : any){
  //   return Number(value);
  // }

  /* 1. Post Form */
  // set post form
  set_form(input: any){
    this.post_form.set(
      input.name, 
      input.type == 'file' ? input.files[0] : input.value
    );
  }

  // submit post form
  submit_post(){
    this.blogService.postBlogPost(this.post_form)
      .subscribe((data : any) => {
        this.blogpost_id = data['id'];
        this.post_type = 'section';
        this.init_section();
      });
  }

  /* 2. Section */
  // add section form
  init_section(){
    this.post_sections.push({
        'blogpost_id': this.blogpost_id.toString(),
        'post_type': 'text',
        'text': null,
        'photo': 'upload',
        'photo_id': null,
        'video': null,
        'edit': true,
    });
  }

  // set section form
  set_section(name: string, input: any, index : number){
    this.post_sections[index][name] = input.files ? input.files[0] : input.value;
  }
  
  handle_img(){
    let images : any = [];
    this.post_sections.forEach((section) => {
      if (section['post_type'] == 'photo'){
        images.push(section['photo']);
      };
    });
    return new Promise(resolve => {
        this.blogService.uploadImg(images).subscribe((data: any) => {
          resolve(data);
        });
      }
    )
  }
  
  // submit section form
  async submit_section(){
    const images_id : any = await this.handle_img();
    
    this.post_sections.forEach((section: any) => {
      if (section['post_type'] == 'photo'){
        section['photo_id'] = images_id[section['photo']['name']];
      }
    });
    this.blogService.postBlogSection(this.post_sections).subscribe((data: any) => {
        console.log('data is =>', data);
    });
    this.router.navigateByUrl('/blog');
  }
}
