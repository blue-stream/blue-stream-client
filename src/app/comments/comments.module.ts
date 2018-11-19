import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment-list/comment/comment.component';
import { SharedModule } from '../shared/shared.module';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentActionButtonsComponent } from './comment-list/comment/comment-action-buttons/comment-action-buttons.component';
import { CommentsHeaderComponent } from './comments-header/comments-header.component';
import { CommentService } from './comment.service';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CommentsComponent,
    CommentComponent,
    CommentListComponent,
    CommentActionButtonsComponent,
    CommentsHeaderComponent,
    CommentFormComponent
  ],
  exports: [CommentsComponent],
  providers: [CommentService]
})
export class CommentsModule { }
