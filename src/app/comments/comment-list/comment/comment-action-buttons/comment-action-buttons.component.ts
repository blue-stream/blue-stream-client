import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bs-comment-action-buttons',
  templateUrl: './comment-action-buttons.component.html',
  styleUrls: ['./comment-action-buttons.component.scss']
})
export class CommentActionButtonsComponent implements OnInit {

  @Input() likes: number;
  @Input() dislikes: number;
  @Input() isReply: boolean = false;
  @Output() replyClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  reply() {
    this.replyClicked.emit();
  }
}
