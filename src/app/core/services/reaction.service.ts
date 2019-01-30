import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reaction, ReactionType } from '../../shared/models/reaction.model';

import { environment } from '../../../environments/environment';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: httpHeaders,
};

interface TypeAmount {
  resource: string;
  types: {
    [id: string]: number
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReactionService {
  private serviceUrl: string = environment.reactionServiceUrl;
  private apiUrl: string = 'api/reaction';

  constructor(private httpClient: HttpClient) { }

  create(reaction: Reaction): Observable<Reaction> {
    return this.httpClient.post<Reaction>(`${this.serviceUrl}${this.apiUrl}`, reaction, httpOptions);
  }

  getOne(reaction: Reaction): Observable<Reaction> {
    const options = {
      httpHeaders,
      params: {
        resource: reaction.resource,
        type: reaction.type,
        resourceType: reaction.resourceType,
        user: reaction.user,
      },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient.get<Reaction>(`${this.serviceUrl}${this.apiUrl}/one`, options);
  }

  getAmountOfTypes(resource: string): Observable<TypeAmount> {
    return this.httpClient.get<TypeAmount>(`${this.serviceUrl}${this.apiUrl}/${resource}/amounts`, httpOptions);
  }

  update(resource: string, type: ReactionType): Observable<Reaction> {
    const options = {
      httpHeaders,
      params: {
        resource,
      },
    };
    const body = { type };

    return this.httpClient.put<Reaction>(`${this.serviceUrl}${this.apiUrl}`, body, options);
  }

  delete(resource: string): Observable<Reaction> {
    const options = {
      httpHeaders,
      params: {
        resource,
      },
    };
    return this.httpClient.delete<Reaction>(`${this.serviceUrl}${this.apiUrl}`, options);
  }
}
