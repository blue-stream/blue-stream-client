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
    this.loadNextComments();
  }

  loadCommentsAmount() {
    const commentFilter: Partial<Comment> = {
      video: this.videoId,
    };

    this.commentService.getAmount(commentFilter).subscribe(amount => {
      this.totalCommentsAmount = amount;
    });
  }

  loadNextComments() {
    this.loadComments(
      this.comments.length,
      this.commentsToLoad);
  }
  onScroll() {
    this.loadNextComments();
  }

  loadComments(startIndex: number, commentsToLoad: number) {
    const endIndex: number = startIndex + commentsToLoad;
    this.commentService.getMany({ video: this.videoId } as Partial<Comment>, startIndex, endIndex)
      .subscribe(comments => {
        this.comments = this.comments.concat(comments);
      });
  }
}
