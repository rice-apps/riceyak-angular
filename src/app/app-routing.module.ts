import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {AuthComponent} from "./components/auth/auth.component";
import {PostsComponent} from "./components/posts/posts.component";
import {AuthGuard} from "./guards/auth.guard";
import {PostDetailComponent} from "./components/post-detail/post-detail.component";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },

  {
    path: 'auth',
    component: AuthComponent
  },

  {
    path: 'posts',
    canActivate: [AuthGuard],
    children: [
        {
          path: '',
          component: PostsComponent,
          pathMatch: 'full'
        },
        {
          path: ':id',
          component: PostDetailComponent
        }
    ]
  },


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
