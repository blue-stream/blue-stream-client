import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Comment } from '../models/comment.model';

@Component({
  selector: 'bs-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
  @Output() deleteComment: EventEmitter<string> = new EventEmitter();

  constructor() { }

  onDelete(commentId: string) {
    this.deleteComment.emit(commentId);
  }

}
