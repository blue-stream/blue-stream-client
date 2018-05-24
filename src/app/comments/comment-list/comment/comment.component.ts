import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'bs-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;

  replies: Comment[] = [];
  showReplies: boolean = false;

  constructor() { }

  ngOnInit() {
    this.loadReplies();
  }

  loadReplies() {
    this.replies = this.comment.replies;
  }

}
