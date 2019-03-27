import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'bs-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.scss']
})
export class CommentRepliesComponent {
  @Input() comments: Comment[] = [];
  @Output() deleteComment: EventEmitter<string> = new EventEmitter();
  constructor() { }

  onDelete(commentId: string) {
    this.deleteComment.emit(commentId);
  }
}
