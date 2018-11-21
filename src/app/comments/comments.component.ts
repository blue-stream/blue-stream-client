import { Component, OnInit, Input } from '@angular/core';

import { Comment } from './models/comment.model';
import { CommentService } from './comment.service';

@Component({
  selector: 'bs-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() videoId: string;

  comments: Comment[] = [];
  totalCommentsAmount: number;
  commentsToLoad: number = 20;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.loadCommentsAmount();
    this.loadNextRootComments();
  }

  loadCommentsAmount() {
    const commentFilter: Partial<Comment> = {
      video: this.videoId,
    };

    this.commentService.getAmount(commentFilter).subscribe(amount => {
      this.totalCommentsAmount = amount;
    });
  }

  loadNextRootComments() {
    this.loadRootComments(
      this.comments.length,
      this.commentsToLoad);
  }

  onScroll() {
    this.loadNextRootComments();
  }

  onCommentSubmitted() {
    // Load all of the comments loaded so far + the newly created one.
    this.comments = [];
    this.loadRootComments(0, this.comments.length + this.commentsToLoad + 1);
  }

  loadRootComments(startIndex: number, commentsToLoad: number) {
    const endIndex: number = startIndex + commentsToLoad;

    this.commentService.getRootComments(this.videoId, startIndex, endIndex)
      .subscribe(comments => {
        this.comments = this.comments.concat(comments);
      });
  }
}
