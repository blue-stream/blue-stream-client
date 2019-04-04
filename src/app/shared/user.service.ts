import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { User } from './models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: httpHeaders,
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUrl: string = environment.userServiceUrl;
  private apiUrl: string = 'api/user';

  constructor(private cookieService: CookieService, private httpClient: HttpClient) {
  }

  public get isAuthenticated(): boolean {
    return this.cookieService.check(environment.authenticationToken);
  }

  public get currentUser(): User {
    const token = this.cookieService.get(environment.authenticationToken);
    if (token) {
      const tokenData = token.split('.')[1];
      const decodedData = window.atob(tokenData);

      return JSON.parse(decodedData) as User;
    }

    return null;
  }

  public get(id: string) {
    return this.httpClient.get<User>(`${this.serviceUrl}${this.apiUrl}/${id}`, httpOptions);
  }

  getSearched(
    searchFilter: string,
    startIndex: number,
    endIndex: number,
    sortOrder: '' | '-' = '',
    sortBy: 'firstName' | 'lastName' | 'mail' | '_id' = 'firstName') {
    const options = {
      httpHeaders,
      params: {
        searchFilter,
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
        sortOrder,
        sortBy,
      },
    };
    return this.httpClient.get<User[]>(`${this.serviceUrl}${this.apiUrl}/search`, options);
  }

}
