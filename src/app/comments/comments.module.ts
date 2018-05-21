import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment-list/comment/comment.component';
import { SharedModule } from '../shared/shared.module';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentActionButtonsComponent } from './comment-list/comment/comment-action-buttons/comment-action-buttons.component';
import { CommentsHeaderComponent } from './comments-header/comments-header.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    CommentsComponent,
    CommentComponent,
    CommentListComponent,
    CommentActionButtonsComponent,
    CommentsHeaderComponent
  ],
  exports: [CommentsComponent]
})
export class CommentsModule { }
