import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import { BlogEditComponent } from './manage-add/blog-edit.component';

import { AuthGuard } from '../../auth/auth';
import { ManageDetailComponent } from './manage-detail/manage-detail.component';
import { ManageModifyComponent } from './manage-modify/manage-modify.component';

const routes: Routes = [
  { path: '', component: ManageComponent, canActivate : [AuthGuard]},
  { path: 'add', component : BlogEditComponent, canActivate : [AuthGuard]},
  { path: 'modify/:post_id', component : ManageModifyComponent, canActivate : [AuthGuard]},
  { path: 'post/:post_id', component : ManageDetailComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
