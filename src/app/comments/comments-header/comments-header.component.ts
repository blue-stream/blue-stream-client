import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bs-comments-header',
  templateUrl: './comments-header.component.html',
  styleUrls: ['./comments-header.component.scss']
})
export class CommentsHeaderComponent implements OnInit {
  @Input() commentsAmount: number;
  @Output() commentSubmitted: EventEmitter<Comment> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onCommentSubmitted() {
    this.commentSubmitted.emit();
  }
}
