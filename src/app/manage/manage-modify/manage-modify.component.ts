import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/services/blog.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { ActionSequence } from 'protractor';

@Component({
  selector: 'app-manage-modify',
  templateUrl: './manage-modify.component.html',
  styleUrls: ['./manage-modify.component.scss']
})
export class ManageModifyComponent implements OnInit {
  ori_post : any = {};
  ori_sections : any = [];
  ori_music_sheet: string = 'Upload';
  ori_photo: string = 'Upload';
  user_id : string = '';
  blogpost_id : any = 0; // post id refered by section
  classes : any = [];
  permissions : Array<string> = ['private', 'public'];
  post_type : string = 'post'; // 'post' or 'section'
  post_form = new FormData(); // post form data
  
  post_sections : Array<any> = []; // section form data
  section_data : any = [];
  sections : Array<any> = []; // number of sections
  section_types : Array<any> = ['text', 'photo', 'video']; // section type
  host : string = environment.apiUrl; // host url

  @ViewChild('post_area') post_area!: ElementRef;
  @ViewChild('section_area') section_area!: ElementRef;
  

  constructor(
    private blogService : BlogService,
    private cookieService: CookieService,
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user_id = this.cookieService.get('user_id');
    this.blogpost_id = this.route.snapshot.paramMap.get('post_id');
    
    // Get blog classes
    this.blogService.getClasses(1, 10)
      .subscribe((resp: any) => this.classes = resp['data']);

    // Get blog post data
    this.blogService.getUserBlogDetailPost(this.blogpost_id)
      .subscribe((data : any) => {
        this.ori_post = data;
        this.ori_sections = this.ori_post.blog_section;
        this.ori_music_sheet = this.ori_post.music_sheet ? this.ori_post.music_sheet.split('/')[3] : 'Upload';
        this.ori_photo = this.ori_post.photo ? this.ori_post.photo.split('/')[3]: 'Upload';
      });
    
    // Initialize Blog Post
    this.post_form.set('user_id', this.user_id);
    
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
    if (input.name == 'music_sheet'){
      this.ori_music_sheet = input.files[0].name;
    }
    if (input.name == 'photo'){
      this.ori_photo = input.files[0].name;
    }
  }

  // submit post form
  submit_post(){
    this.blogService.patchBlogPost(this.post_form, this.blogpost_id)
      .subscribe((data : any) => {
        this.blogpost_id = data['id'];
        this.post_type = 'section';
      });
  }

  /* 2. Section */
  add_section(){
    // add section data to sections
    this.ori_sections[this.ori_sections.length] = {
      'blogpost_id': this.blogpost_id, 
      'order': this.ori_sections.length + 1, 
      'post_type': 'text', 
      'text': null, 
      'photo': null, 
      'video': null
    };
  }

  // set section form
  set_section(name: string, input: any, index : number){
    console.log('index is =>', index);
    console.log('name is =>', name);
    if (name == 'post_type'){
      this.ori_sections[index]['type'] = input.value;
      this.ori_sections[index]['text'] = null;
      if(this.ori_sections[index]['photo_id']){
        delete this.ori_sections[index]['photo_id'];
      };
      this.ori_sections[index]['photo'] = null;
      this.ori_sections[index]['video'] = null;
    }
    this.ori_sections[index][name] = input.files ? input.files[0] : input.value;
    if (input.files){
      this.ori_sections[index]['name'] = input.files[0].name;
    }
    
    console.log('this.ori_sections is =>', this.ori_sections);
  }

  handle_img(){
    let images : any = [];
    this.ori_sections.forEach((section : any) => {
      console.log('section is =>', typeof section['photo']);
      if(section['post_type'] == 'photo' && typeof section['photo'] == 'object'){
        images.push(section['photo']);
      }
    });
    console.log('images is =>', images);
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
    this.ori_sections.forEach((section: any) => {
      if(section['post_type'] == 'photo' && typeof section['photo'] == 'object'){
        section['photo_id'] = images_id[section['name']];
      }
    });
    this.blogService.patchBlogSection(this.ori_sections, this.blogpost_id)
      .subscribe((resp : any) => {
        console.log('data is =>', resp);
        this.router.navigateByUrl('/manage');
      });
  }
}
