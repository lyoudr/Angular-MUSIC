import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ProductAddEditComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
  ]
})
export class SharedModule { }
