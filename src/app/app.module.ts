import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,
    CoreModule
  ],
  providers: [
    MediaMatcher,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
