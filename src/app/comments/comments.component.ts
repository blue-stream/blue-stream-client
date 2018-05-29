import { Component, OnInit } from '@angular/core';

import { Comment } from './models/comment.model';
import { CommentService } from './comment.service';

@Component({
  selector: 'bs-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments().subscribe( comments => {
      this.comments = comments;
    });
  }
}
