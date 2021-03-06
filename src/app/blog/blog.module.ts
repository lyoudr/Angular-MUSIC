import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    imports: [
        CommonModule,
        BlogRoutingModule,
        PdfViewerModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations : [
        BlogComponent,
        BlogDetailComponent,
    ]
})
export class BlogModule {}