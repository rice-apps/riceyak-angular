import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {AuthComponent} from './components/auth/auth.component';
import {PostsComponent} from './components/posts/posts.component';
import { AdminComponent } from './components/admin/admin.component';
import {AuthGuard} from './guards/auth.guard';
import {PostDetailComponent} from './components/post-detail/post-detail.component';
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: LandingPageComponent
  },

  {
    path: 'auth',
    component: AuthComponent
  },

  {
    path: 'admin',
    component: AdminComponent
  },

  {
    path: 'posts',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PostsComponent
      },

      {
        path: ':_id',
        component: PostDetailComponent
      }
    ]
  },

  {
    path: 'about',
    component: AboutComponent
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
