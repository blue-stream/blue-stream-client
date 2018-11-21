import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../comment.service';

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

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  onCommentSubmitted() {
    this.loadReplies();
  }

  onShowReplies() {
    this.showReplies = !this.showReplies;

    if (this.showReplies && this.replies.length === 0) {
      this.loadReplies();
    }
  }

  onDelete() {
    this.deleteComment.emit(this.comment._id);
  }

  loadReplies() {
   this.commentService.getReplies(this.comment._id).subscribe(replies => {
     this.replies = replies;
    });
  }
}
