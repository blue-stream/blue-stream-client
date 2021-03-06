import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../../environments/environment';
import { Comment } from '../models/comment.model';
import { CommentService } from '../../core/services/comment.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'bs-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Input() user: string = 'user@domain';
  @Input() resource: string;
  @Input() parent: string;
  @Output() commentSubmitted: EventEmitter<Partial<Comment>> = new EventEmitter();

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

  onSubmit() {
    const text: string = this.commentForm.get('text').value.trim();

    const comment: Partial<Comment> = {
      text,
      parent: this.parent,
      user: this.user,
      resource: this.resource,
    };

    this.commentForm.setValue({ text: '' });
    this.publishComment(comment);
  }

  publishComment(comment: Partial<Comment>) {
    this.commentService.create(comment).subscribe(createdComment => {
      this.commentSubmitted.emit(comment);
      this.commentService.commentSubmitted.next(comment);
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
