import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { CanDeactivateGuard } from './core/can-deactivate/can-deactivate.guard';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './shared/user.service';
import { CanSysAdminActivateGuard } from './core/guards/can-sysadmin-activate.guard';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function authenticateUser(userService: UserService) {
  return () => {
    if (userService.isAuthenticated) {
      return Promise.resolve(true);
    }

    document.location.href = `${environment.authenticationServiceUrl}auth/login`;
    return Promise.reject(false);
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    CoreModule,
  ],
  providers: [
    MediaMatcher,
    CookieService,
    CanDeactivateGuard,
    CanSysAdminActivateGuard,
    { provide: OverlayContainer, useClass: FullscreenOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: authenticateUser, multi: true, deps: [UserService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
