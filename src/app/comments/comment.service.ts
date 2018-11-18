import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { Comment } from './models/comment.model';
import { MOCK_COMMENTS, MOCK_REPLIES } from './models/comments.mock';

import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
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

  get(commentFilter: Partial<Comment>): Observable<Comment[]> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const params = new HttpParams();
    const options = ({
      headers, params
    });

    return this.httpClient.get<Comment[]>(`${this.serviceUrl}${this.apiUrl}`, options);
  }

  getComments(): Observable<Comment[]> {
    return Observable.of(MOCK_COMMENTS);
  }

  getReplies(commentId: string): Observable<Comment[]> {
    const replies: Comment[] = MOCK_REPLIES.filter(comment => comment.parentCommentId === commentId);

    return Observable.of(replies);
  }

  getRepliesAmount(commentId: string): Observable<number> {
    const replies: Comment[] = MOCK_REPLIES.filter(comment => comment.parentCommentId === commentId);

    return Observable.of(replies.length);
  }
}
