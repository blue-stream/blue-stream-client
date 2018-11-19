import { Component, OnInit, Input } from '@angular/core';

import { Comment } from './models/comment.model';
import { CommentService } from './comment.service';

@Component({
  selector: 'bs-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  @Input() videoId: string;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    const startIndex: number = 0;
    const commentsToLoad: number = 0;
    this.loadComments(startIndex, commentsToLoad);
  }

  loadComments(startIndex: number, commentsToLoad: number) {
    const endIndex: number = startIndex + commentsToLoad;
    this.commentService.getMany({ video: this.videoId } as Partial<Comment>, startIndex, endIndex)
      .subscribe(comments => {
        this.comments = comments;
      });
  }
}
