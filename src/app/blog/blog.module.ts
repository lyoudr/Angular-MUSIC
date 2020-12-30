import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
@NgModule({
    imports: [
        CommonModule,
        BlogRoutingModule,
        PdfViewerModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations : [
        BlogComponent,
        BlogDetailComponent,
        BlogEditComponent
    ]
})
export class BlogModule {}