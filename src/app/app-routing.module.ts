import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {AuthComponent} from "./components/auth/auth.component";

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },

  {
    path: 'auth',
    component: AuthComponent
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
