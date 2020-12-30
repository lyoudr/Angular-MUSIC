import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})

export class BlogService {

    host : string = 'http://127.0.0.1:5000';
    authorization_basic = window.btoa('ann' + ':' + 'ann123');
    
    constructor(
        private http: HttpClient,
       
    ) {}
    
    getClasses() {
        return this.http.get(`${this.host}/api/blog/class/`);
    }

    getBlogPost(page: number, page_size : number, blog_id : any, class_name: any) {
        class_name = class_name.length ? class_name.join(): '';
        return this.http.get(`${this.host}/api/blog/post/get/`, {
            params: new HttpParams({fromString: `page=${page}&page_size=${page_size}&id=${blog_id ? blog_id : ''}&class=${class_name ? class_name : ''}`})
        });
    }

    postBlogPost(data: any){
        return this.http.post(`${this.host}/api/blog/post/manage/`, data, {
            headers : {'Authorization': `Basic ${this.authorization_basic}`}
        })
    }

    postBlogSection(data: any){
        return this.http.post(`${this.host}/api/blog/section/`, data, {
            headers : {'Authorization': `Basic ${this.authorization_basic}`}
        })
    }
}