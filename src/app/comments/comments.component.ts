import { Component, OnInit, Input } from '@angular/core';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { Comment } from './models/comment.model';
import { CommentService } from './comment.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { CommentDeleteDialogComponent } from './comment-delete-dialog/comment-delete-dialog.component';

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

  constructor(
    private commentService: CommentService,
    public snackBar: MatSnackBar,
    private translateService: TranslateService,
    public dialog: MatDialog) {
    this.commentService.commentSubmitted.subscribe((comment) => {
      this.onCommentSubmitted(comment);
    });
  }

  ngOnInit() {
    this.loadCommentsAmount();
    this.loadNextRootComments();
  }

  openDeleteCommentDialog(commentId: string): void {
    const dialogRef = this.dialog.open(CommentDeleteDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteComment(commentId);
      }
    });
  }

  loadCommentsAmount() {
    const commentFilter: Partial<Comment> = {
      video: this.videoId,
    };

    this.commentService.getAmount(commentFilter).subscribe(amount => {
      this.totalCommentsAmount = amount;
    });
  }

  onDelete(commentId: string) {
    this.openDeleteCommentDialog(commentId);
  }

  deleteComment(commentId: string) {
    this.commentService.delete(commentId).subscribe(res => {
      this.comments = [];
      this.loadRootComments(0, this.comments.length + this.commentsToLoad - 1);
      this.loadCommentsAmount();

      this.translateService.get([
        'COMMENTS.DELETE_SUCCESS',
        'COMMENTS.DELETE_SUCCESS_APPROVAL']).subscribe(translations => {
          this.snackBar.open(
            translations['COMMENTS.DELETE_SUCCESS'],
            translations['COMMENTS.DELETE_SUCCESS_APPROVAL'],
            { duration: 2000 });
        });
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

  onCommentSubmitted(comment: Partial<Comment>) {
    // Load all of the comments loaded so far + the newly created one.
    this.loadCommentsAmount();

    if (!comment.parent) {
      this.comments = [];

      this.loadRootComments(0, this.comments.length + this.commentsToLoad + 1);
    }

  }

  loadRootComments(startIndex: number, commentsToLoad: number) {
    const endIndex: number = startIndex + commentsToLoad;

    this.commentService.getRootComments(this.videoId, startIndex, endIndex)
      .subscribe(comments => {
        console.log(comments);
        this.comments = this.comments.concat(comments);
      });
  }
}
