import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Comment } from '../../comments/models/comment.model';

import { environment } from '../../../environments/environment';

const httpHeaders: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
});

const httpOptions = {
  headers: httpHeaders,
};

@Injectable()

export class CommentService {

  private serviceUrl: string = environment.commentServiceUrl;
  private apiUrl: string = 'api/comment';

  public commentSubmitted: Subject<Partial<Comment>>;
  public commentRemoved: Subject<string>;

  constructor(private httpClient: HttpClient) {
    this.commentSubmitted = new Subject<Partial<Comment>>();
    this.commentRemoved = new Subject<string>();
  }

  create(comment: Partial<Comment>): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.serviceUrl}${this.apiUrl}`, comment, httpOptions);
  }

  update(comment: Partial<Comment>): Observable<Comment> {
    return this.httpClient.put<Comment>(`${this.serviceUrl}${this.apiUrl}/${comment.id}`, { text: comment.text, }, httpOptions);
  }

  delete(commentId: string): Observable<Comment> {
    return this.httpClient.delete<Comment>(`${this.serviceUrl}${this.apiUrl}/${commentId}`, httpOptions);
  }

  getAmount(commentFilter: Partial<Comment>): Observable<number> {
    const options = {
      httpHeaders,
      params: {
        parent: commentFilter.parent,
        text: commentFilter.text,
        user: commentFilter.user as string,
        resource: commentFilter.resource,
      },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient
      .get<number>(`${this.serviceUrl}${this.apiUrl}/amount`, options);

  }

  getRootComments(resource: string, startIndex: number, endIndex: number): Observable<Comment[]> {
    const options = {
      httpHeaders,
      params: {
        resource,
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
      },
    };

    return this.httpClient.get<Comment[]>(`${this.serviceUrl}${this.apiUrl}/root`, options);
  }

  getReplies(parent: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${this.serviceUrl}${this.apiUrl}/${parent}/replies`, httpOptions);
  }

  getMany(commentFilter: Partial<Comment>, startIndex: number, endIndex: number): Observable<Comment[]> {
    const options = {
      httpHeaders,
      params: {
        parent: commentFilter.parent,
        text: commentFilter.text,
        user: commentFilter.user as string,
        resource: commentFilter.resource,
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
      },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient.get<Comment[]>(`${this.serviceUrl}${this.apiUrl}/many`, options);
  }
}
