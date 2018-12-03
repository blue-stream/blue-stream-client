import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { Comment } from '../models/comment.model';
import { CommentService } from '../comment.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'bs-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input() user: string = 'a@a';
  @Input() videoId: string = '123456789112345678911234';
  @Input() parent: string;

  commentForm: FormGroup;
  showButtons: boolean = false;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private translateService: TranslateService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      text: this.fb.control('', [
        Validators.minLength(environment.commentMinLength),
        Validators.maxLength(environment.commentMaxLength)
      ]),
    });
  }

  onFocus() {
    this.showButtons = true;
  }

  onBlur() {
    this.commentForm.get('text').markAsUntouched();
  }

  onSubmit(event: Event) {
    const comment: Comment = {
      ...this.commentForm.value,
      parent: this.parent,
      user: this.user,
      video: this.videoId,
    };

    this.commentForm.setValue({ text: '' });
    this.showButtons = false;
    this.publishComment(comment);
  }

  publishComment(comment: Comment) {
    this.commentService.create(comment).subscribe(createdComment => {
      this.commentService.commentSubmitted.next();
      this.translateService.get([
        'COMMENTS.COMMENTS_FORM.COMMENT_POSTED',
        'COMMENTS.COMMENTS_FORM.COMMENT_POSTED_APPROVE']).subscribe(translations => {
          this.snackBar.open(
            translations['COMMENTS.COMMENTS_FORM.COMMENT_POSTED'],
            translations['COMMENTS.COMMENTS_FORM.COMMENT_POSTED_APPROVE'],
            { duration: 2000 });
        });
    });
  }
}
