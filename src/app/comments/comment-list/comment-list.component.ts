import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Comment } from '../models/comment.model';

@Component({
  selector: 'bs-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() comments: Comment[] = [];
  @Input() isReplyList: boolean = false;
  @Output() deleteComment: EventEmitter<string> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onDelete(commentId: string) {
    this.deleteComment.emit(commentId);
  }

}
