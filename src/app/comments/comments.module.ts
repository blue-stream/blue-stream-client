import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './comments.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CommentsComponent, CommentComponent],
  exports: [CommentsComponent]
})
export class CommentsModule { }
