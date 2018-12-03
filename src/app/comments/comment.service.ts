import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { Comment } from './models/comment.model';

import { environment } from './../../environments/environment';

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

  constructor(private httpClient: HttpClient) { }

  create(comment: Partial<Comment>): Observable<Comment> {
    return this.httpClient.post<Comment>(`${this.serviceUrl}${this.apiUrl}`, comment, httpOptions);
  }

  update(comment: Partial<Comment>): Observable<Comment> {
    return this.httpClient.put<Comment>(`${this.serviceUrl}${this.apiUrl}/${comment.id}`, comment, httpOptions);
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
        user: commentFilter.user,
        video: commentFilter.video,
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

  getRootComments(video: string, startIndex: number, endIndex: number): Observable<Comment[]> {
    const options = {
      httpHeaders,
      params: {
        video,
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
      },
    };

    return this.httpClient.get<Comment[]>(`${this.serviceUrl}${this.apiUrl}/root`, options)
      .map(comments => {
        return comments.map(comment => {
          comment.id = (comment as any)._id;
          return comment;
        });
      });
  }

  getReplies(parent: string): Observable<Comment[]> {
    const options = {
      httpHeaders,
      params: {
        parent,
      },
    };

    return this.httpClient.get<Comment[]>(`${this.serviceUrl}${this.apiUrl}/replies`, options)
      .map(comments => {
        return comments.map(comment => {
          comment.id = (comment as any)._id;
          return comment;
        });
      });
  }

  getMany(commentFilter: Partial<Comment>, startIndex: number, endIndex: number): Observable<Comment[]> {
    const options = {
      httpHeaders,
      params: {
        parent: commentFilter.parent,
        text: commentFilter.text,
        user: commentFilter.user,
        video: commentFilter.video,
        startIndex: startIndex.toString(),
        endIndex: endIndex.toString(),
      },
    };

    Object.keys(options.params).forEach(key => {
      if (options.params[key] === undefined) {
        delete options.params[key];
      }
    });

    return this.httpClient.get<Comment[]>(`${this.serviceUrl}${this.apiUrl}/many`, options)
      .map(comments => {
        return comments.map(comment => {
          comment.id = (comment as any)._id;
          return comment;
        });
      });
  }
}
