import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResourceType } from 'src/app/shared/models/reaction.model';

@Component({
  selector: 'bs-comment-action-buttons',
  templateUrl: './comment-action-buttons.component.html',
  styleUrls: ['./comment-action-buttons.component.scss']
})
export class CommentActionButtonsComponent implements OnInit {

  @Input() comment: Comment;
  @Input() isReply: boolean = false;
  @Output() replyClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();

  resourceType = ResourceType.Comment;

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleteClicked.emit();
  }

  reply() {
    this.replyClicked.emit();
  }
}
