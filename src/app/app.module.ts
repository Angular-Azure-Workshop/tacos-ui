import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { TacosListModule } from './tacos-list/tacos-list.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found.component';
import { LandingComponent } from './landing/landing.component';
import { AuthComponent } from './security/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LandingComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    TacosListModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
