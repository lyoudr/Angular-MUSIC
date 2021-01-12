import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from './../environments/environment';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class BlogService {

    host : string = environment.apiUrl;
    authorization_basic = window.btoa('ann' + ':' + 'ann123');
    blog_headers : any = {
        'Authorization' : `Basic ${this.authorization_basic}`,
        'X-CSRFToken' : this.cookieService.get('csrftoken')
    }
    
    constructor(
        private http: HttpClient,
        private cookieService : CookieService
    ) {}
    
    // Get blog classes
    getClasses() {
        return this.http.get(`${this.host}/api/blog/class/`);
    }

    // Get all blog posts (list or detail)
    getBlogPost(page: number, page_size : number, blog_id : any, class_name: any) {
        class_name = class_name.length ? class_name.join(): '';
        return this.http.get(`${this.host}/api/blog/post/get/all`, {
            params: new HttpParams({fromString: `page=${page}&page_size=${page_size}&id=${blog_id ? blog_id : ''}&class=${class_name ? class_name : ''}`})
        });
    }

    // Get user blog posts (list or detail)
    getUserBlogPost(page: number, page_size : number, blog_id : any, user_id: any){
        return this.http.get(`${this.host}/api/blog/post/get/user`, {
            headers : this.blog_headers,
            params: new HttpParams({fromString: `page=${page}&page_size=${page_size}&id=${blog_id ? blog_id : ''}&user_id=${user_id}`})
        });
    }

    // post blog main post
    postBlogPost(data: any){
        console.log('this.blog_headers is =>', this.blog_headers)
        return this.http.post(`${this.host}/api/blog/post/manage/`, data, {
            headers : this.blog_headers
        });
    }

    // post blog section
    postBlogSection(data: any){
        return this.http.post(`${this.host}/api/blog/section/`, data, {
            headers : this.blog_headers
        });
    }

    // delete blog post
    deleteBlogPost(post_id : number){
        return this.http.delete(`${this.host}/api/blog/post/manage/`, {
            headers : this.blog_headers,
            params: new HttpParams({fromString: `id=${post_id}`})
        });
    }
}