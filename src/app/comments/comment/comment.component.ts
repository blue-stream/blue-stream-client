import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../models/comment.model';
import { CommentService } from '../../core/services/comment.service';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'bs-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Output() deleteComment: EventEmitter<string> = new EventEmitter();

  replies: Comment[] = [];
  showReplies: boolean = false;
  showReplyForm: boolean = false;
  timeAgo: string;
  isLoadingReplies: boolean = false;
  userId: string;
  userFirstName: string;

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
  }

  getTimeAgo(): string {
    return moment(this.comment.createdAt).fromNow();
  }

  onCommentSubmitted() {
    this.comment.repliesAmount++;
    this.showReplyForm = false;
    this.loadReplies();
    this.showReplies = true;
  }

  onShowReplies() {
    this.showReplies = !this.showReplies;

    if (this.showReplies && this.replies.length === 0) {
      this.loadReplies();
    }
  }

  onDelete() {
    this.deleteComment.emit(this.comment.id);
  }

  loadReplies() {
    this.isLoadingReplies = true;
    this.commentService.getReplies(this.comment.id).subscribe(replies => {
      this.replies = replies;
      this.isLoadingReplies = false;
    },
      (error) => {
        this.isLoadingReplies = false;
      });
  }
}
