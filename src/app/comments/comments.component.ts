import { Component, OnInit } from '@angular/core';

import { Comment } from './models/comment.model';

@Component({
  selector: 'bs-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];

  constructor() { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    const comment: Comment = {
      date: '12/12/12',
      user: 'Almog',
      dislikes: 12,
      likes: 12,
      id: '1213',
      text: 'Very good video, good good job'
    };

    this.comments.push(comment);
    this.comments.push(comment);
    this.comments.push(comment);
  }
}
