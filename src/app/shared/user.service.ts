import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cookieService: CookieService) {
  }

  public get isAuthenticated() {
    return this.cookieService.check(environment.authenticationToken);
  }

  public get currentUser() {
    const token = this.cookieService.get(environment.authenticationToken);
    if (token) {
      const tokenData = token.split('.')[1];
      const decodedData = window.atob(tokenData);

      return JSON.parse(decodedData);
    }

    return null;
  }

  getUser() {
    return 'user@domain';
  }
}
