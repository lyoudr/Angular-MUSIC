import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoaderComponent,
    ProductAddEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoaderComponent,
    ProductAddEditComponent,
  ],
  // schemas : [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class SharedModule { }
