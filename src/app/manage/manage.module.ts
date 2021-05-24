import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { BlogEditComponent } from './manage-add/blog-edit.component';
import { ManageDetailComponent } from './manage-detail/manage-detail.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ManageModifyComponent } from './manage-modify/manage-modify.component';

@NgModule({
  declarations: [
    ManageComponent,
    BlogEditComponent,
    ManageDetailComponent,
    ManageModifyComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManageModule { }
