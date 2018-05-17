import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../models/comment.model';

@Component({
  selector: 'bs-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];
  constructor() { }

  ngOnInit() {
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
