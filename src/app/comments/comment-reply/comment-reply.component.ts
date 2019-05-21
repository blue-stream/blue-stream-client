import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../models/comment.model';
import { CommentService } from '../../core/services/comment.service';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'bs-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss']
})
export class CommentReplyComponent implements OnInit {

  @Input() comment: Comment;
  @Output() deleteComment: EventEmitter<string> = new EventEmitter();

  timeAgo: string;
  userId: string;
  userFirstName: string;
  userLink: string;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.timeAgo = this.getTimeAgo();

    if ((this.comment.user as User).id) {
      this.userId = (this.comment.user as User).id;
      this.userFirstName = (this.comment.user as User).firstName ?
        (this.comment.user as User).firstName : this.userId;
    } else {
      this.userId = this.comment.user as string;
    }

    this.userLink = `/channels/profile/${this.userId}`;
  }

  getTimeAgo(): string {
    return moment(this.comment.createdAt).fromNow();
  }


  onDelete() {
    this.commentService.commentRemoved.next(this.comment.id);
  }

}
