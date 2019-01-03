import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Channel } from './channel.model';

import { environment } from './../../environments/environment';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: httpHeaders,
};

@Injectable()
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  private serviceUrl: string = environment.channelServiceUrl;
  private apiUrl: string = 'api/channel';

  getChannel(id: string): Observable<Channel> {
    return this.httpClient.get<Channel>(`${this.serviceUrl}${this.apiUrl}/${id}`, httpOptions);
  }

  create(channel: Partial<Channel>): Observable<Channel> {
    return this.httpClient.post<Channel>(`${this.serviceUrl}${this.apiUrl}`, channel, httpOptions);
  }

  updateName(id: string, name: string): Observable<Channel> {
    return this.httpClient.put<Channel>(`${this.serviceUrl}${this.apiUrl}/${id}/name`, { name }, httpOptions);
  }

  updateDescription(id: string, description: string): Observable<Channel> {
    return this.httpClient.put<Channel>(`${this.serviceUrl}${this.apiUrl}/${id}/description`, { description }, httpOptions);
  }

}
