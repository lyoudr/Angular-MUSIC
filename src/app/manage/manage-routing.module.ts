import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage.component';
import { BlogEditComponent } from './manage-add/blog-edit.component';

import { AuthGuard } from '../../auth/auth';
import { ManageDetailComponent } from './manage-detail/manage-detail.component';

const routes: Routes = [
  { path: '', component: ManageComponent },
  { path: 'add', component : BlogEditComponent, canActivate : [AuthGuard]},
  { path: 'post/:post_id', component : ManageDetailComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
