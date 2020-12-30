import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { AuthGuard } from '../../auth/auth';

import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';

const routes : Routes = [
    { path: '', component : BlogComponent },
    { path: 'blog/post/:post_id', component : BlogDetailComponent },
    { path: 'blog/edit', component : BlogEditComponent, canActivate : [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogRoutingModule { }