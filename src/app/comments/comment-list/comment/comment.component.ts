import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../comment.service';
import * as moment from 'moment';

@Component({
  selector: 'bs-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() isReply: boolean = false;
  @Output() deleteComment: EventEmitter<string> = new EventEmitter();

  replies: Comment[] = [];
  showReplies: boolean = false;
  showReplyForm: boolean = false;
  timeAgo: string;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.timeAgo = this.getTimeAgo();
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
    this.commentService.getReplies(this.comment.id).subscribe(replies => {
      this.replies = replies;
    });
  }
}
