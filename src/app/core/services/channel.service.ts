import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Channel } from '../../shared/models/channel.model';

import { environment } from '../../../environments/environment';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: httpHeaders,
};

@Injectable()
export class ChannelService {

  public channelUpdated: Subject<Channel>;

  constructor(private httpClient: HttpClient) {
    this.channelUpdated = new Subject<Channel>();
  }

  private serviceUrl: string = environment.channelServiceUrl;
  private apiUrl: string = 'api/channel';

  getChannel(id: string): Observable<Channel> {
    return this.httpClient.get<Channel>(`${this.serviceUrl}${this.apiUrl}/${id}`, httpOptions);
  }

  getMany(
    channelFilter: Partial<Channel>,
    startIndex: number,
    endIndex: number,
    sortOrder: '' | '-' = '',
    sortBy: 'name' | 'description' | 'user' = 'name'): Observable<Channel[]> {
    const options = {
      httpHeaders,
      params: {
        name: channelFilter.name,
        description: channelFilter.description,
        user: channelFilter.user,
        isProfile: channelFilter.isProfile,
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
        sortOrder,
        sortBy,
      } as { [key: string]: any },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient.get<Channel[]>(`${this.serviceUrl}${this.apiUrl}/many`, options);
  }

  search(
    searchFilter: string = '',
    startIndex: number,
    endIndex: number,
    sortOrder: '' | '-' = '',
    sortBy: 'name' | 'description' | 'user' = 'name'): Observable<Channel[]> {
    if (!searchFilter.trim()) { return of([]); }
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

    return this.httpClient.get<Channel[]>(`${this.serviceUrl}${this.apiUrl}/search`, options);
  }

  searchAmount(
    searchFilter: string): Observable<number> {
    const options = {
      httpHeaders,
      params: {
        searchFilter,
      },
    };

    return this.httpClient.get<number>(`${this.serviceUrl}${this.apiUrl}/search/amount`, options);
  }

  getAmount(
    channelFilter: Partial<Channel>): Observable<number> {

    let isProfile;

    if (channelFilter.isProfile !== undefined && channelFilter.isProfile !== null) {
      isProfile = channelFilter.isProfile.toString();
    }
    const options = {
      httpHeaders,
      params: {
        isProfile,
        name: channelFilter.name,
        description: channelFilter.description,
        user: channelFilter.user,
      },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient.get<number>(`${this.serviceUrl}${this.apiUrl}/amount`, options);
  }

  create(channel: Partial<Channel>): Observable<Channel> {
    return this.httpClient.post<Channel>(`${this.serviceUrl}${this.apiUrl}`, channel, httpOptions);
  }

  update(id: string, updateParams: Partial<Channel>): Observable<Channel> {
    return this.httpClient.put<Channel>(`${this.serviceUrl}${this.apiUrl}/${id}`, updateParams, httpOptions);
  }
}
