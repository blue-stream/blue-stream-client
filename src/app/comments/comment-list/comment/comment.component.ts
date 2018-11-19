import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../comment.service';

@Component({
  selector: 'bs-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;

  replies: Comment[] = [];
  repliesAmount: number = 0;
  showReplies: boolean = false;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.loadRepliesAmount();
  }

  onShowReplies() {
    this.showReplies = !this.showReplies;

    if (this.showReplies) {
      this.loadReplies();
    }
  }

  loadReplies() {
   // this.commentService.getReplies(this.comment.id).subscribe(replies => {
   //   this.replies = replies;
   // });
  }

  loadRepliesAmount() {
  //  this.commentService.getRepliesAmount(this.comment.id).subscribe(repliesAmount => {
  //    this.repliesAmount = repliesAmount;
  //  });
  }

}
