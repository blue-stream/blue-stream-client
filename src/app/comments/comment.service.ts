import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { Comment } from './models/comment.model';
import { MOCK_COMMENTS, MOCK_REPLIES } from './models/comments.mock';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  getComments(): Observable<Comment[]> {
    return Observable.of(MOCK_COMMENTS);
  }

  getReplies(commentId: string): Observable<Comment[]> {
    const replies: Comment[] = MOCK_REPLIES.filter( comment => comment.parentCommentId === commentId);

    return Observable.of(replies);
  }

  getRepliesAmount(commentId: string): Observable<number> {
    const replies: Comment[] = MOCK_REPLIES.filter( comment => comment.parentCommentId === commentId);

    return Observable.of(replies.length);
  }
}
