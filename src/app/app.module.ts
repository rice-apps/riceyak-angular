import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthService} from "./services/auth-service/auth.service";
import {PostService} from "./services/post-service/post.service";
import { AuthComponent } from './components/auth/auth.component';
import {HttpModule} from "@angular/http";
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AuthComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    AuthService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
