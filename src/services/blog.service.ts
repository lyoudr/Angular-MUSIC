import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from './../environments/environment';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})

export class BlogService {

    host : string = environment.apiUrl;
    
    constructor(
        private http: HttpClient,
        private cookieService : CookieService
    ) {}
    /* Blog View */
    // Get blog classes
    getClasses(page: number, page_size: number) {
        return this.http.get(`${this.host}/api/blog/class?page=${page}&page_size=${page_size}`);
    }

    // Get all blog posts list
    getBlogPost(page: number, page_size : number, class_name: any) {
        class_name = class_name.length ? class_name.join(): '';
        return this.http.get(`${this.host}/api/blog/`, {
            params: new HttpParams({fromString: `page=${page}&page_size=${page_size}&class=${class_name ? class_name : ''}`})
        });
    }

    // Get detail blog post
    getBlogDetailPost(blog_id: any) {
        return this.http.get(`${this.host}/api/blog/${blog_id}`, {
            headers: {
                'Authorization' : this.cookieService.get('access_token') ? `Bearer ${this.cookieService.get('access_token')}` : '',
                'X-CSRFToken' : this.cookieService.get('csrftoken') ? this.cookieService.get('csrftoken') : ''
            }
        })
    }


    /* Blog User View */
    // Get user blog list posts 
    getUserBlogPost(page: number, page_size : number){
        return this.http.get(`${this.host}/api/blog/user`, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            },
            params: new HttpParams({fromString: `page=${page}&page_size=${page_size}`})
        });
    }
    
    // Get user blog detail post
    getUserBlogDetailPost(pk: any){
        return this.http.get(`${this.host}/api/blog/user/${pk}`, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // post blog main post
    postBlogPost(data: any){
        return this.http.post(`${this.host}/api/blog/user`, data, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // update blog main post
    patchBlogPost(data : any, blogpost_id : any){
        return this.http.patch(`${this.host}/api/blog/user`, data, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            },
            params : new HttpParams({fromString: `id=${blogpost_id}`})
        });
    }
    // delete blog post
    deleteBlogPost(post_id : number){
        return this.http.delete(`${this.host}/api/blog/user`, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            },
            params: new HttpParams({fromString: `id=${post_id}`})
        });
    }


    // post blog section
    postBlogSection(data: any){
        console.log('post blog section data is =>', data)
        return this.http.post(`${this.host}/api/blog/section`, data, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // update blog section
    patchBlogSection(data: any, pk : any){
        return this.http.patch(`${this.host}/api/blog/section/${pk}`, data, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }

    // upload blog photos to get photo id
    uploadImg(images: Array<any>){
        var formData = new FormData();
        images.forEach(img => formData.append(img.name, img));
        return this.http.post(`${this.host}/api/blog/photo`, formData, {
            headers : {
                'Authorization' : `Bearer ${this.cookieService.get('access_token')}`,
                'X-CSRFToken' : this.cookieService.get('csrftoken')
            }
        });
    }
}