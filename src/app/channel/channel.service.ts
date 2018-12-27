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

}