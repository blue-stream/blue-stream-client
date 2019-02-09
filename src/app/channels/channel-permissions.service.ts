import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { environment } from './../../environments/environment';
import { UserPermissions, PermissionTypes } from './user-permissions.model';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: httpHeaders,
};

@Injectable({
  providedIn: 'root'
})
export class ChannelPermissionsService {

  constructor(private httpClient: HttpClient) { }

  private serviceUrl: string = environment.channelServiceUrl;
  private apiUrl: string = 'api/userPermissions';

  create(userPermissions: Partial<UserPermissions>): Observable<UserPermissions> {
    return this.httpClient.post<UserPermissions>(`${this.serviceUrl}${this.apiUrl}`, userPermissions, httpOptions);
  }

  update(user: string, channel: string, permissions: PermissionTypes[]): Observable<UserPermissions> {
    const options = {
      httpHeaders,
      params: {
        channel,
        user,
      },
    };
    return this.httpClient.put<UserPermissions>(`${this.serviceUrl}${this.apiUrl}`, { permissions }, options);
  }

  delete(user: string, channel: string): Observable<UserPermissions> {
    const options = {
      httpHeaders,
      params: {
        channel,
        user,
      },
    };
    return this.httpClient.delete<UserPermissions>(`${this.serviceUrl}${this.apiUrl}`, options);
  }

  getOne(channelId: string): Observable<UserPermissions> {
    const options = {
      httpHeaders,
      params: {
        channel: channelId,
      },
    };
    return this.httpClient.get<UserPermissions>(`${this.serviceUrl}${this.apiUrl}/one`, options);
  }

  getChannelPermittedUsers(channelId: string,
    startIndex: number,
    endIndex: number,
    sortOrder: '' | '-' = '',
    sortBy: 'channel' | 'user' = 'user'): Observable<UserPermissions[]> {
    const options = {
      httpHeaders,
      params: {
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
        sortOrder,
        sortBy,
      },
    };
    return this.httpClient.get<UserPermissions[]>(`${this.serviceUrl}${this.apiUrl}/${channelId}/users`, options);
  }

  getChannelPermittedUsersAmount(channelId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.serviceUrl}${this.apiUrl}/${channelId}/users/amount`, httpOptions);
  }

  getUserPermittedChannels(channelId: string,
    startIndex: number,
    endIndex: number,
    sortOrder: '' | '-' = '',
    sortBy: 'channel' | 'user' = 'channel'): Observable<UserPermissions> {
    const options = {
      httpHeaders,
      params: {
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
        sortOrder,
        sortBy,
      },
    };
    return this.httpClient.get<UserPermissions>(`${this.serviceUrl}${this.apiUrl}/channels`, options);
  }

  getUserPermittedChannelsAmount(channelId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.serviceUrl}${this.apiUrl}/channels/amount`, httpOptions);
  }

}
