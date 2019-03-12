import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResourceType } from 'src/app/shared/models/reaction.model';
import { UserService } from 'src/app/shared/user.service';
import { Comment } from '../models/comment.model';
import { User } from '../../shared/models/user.model';

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

  isOwner: boolean;

  resourceType = ResourceType.Comment;

  constructor(private userService: UserService) {}

  ngOnInit() {
    const commentsOwner = (this.comment.user as User).id ? (this.comment.user as User).id : this.comment.user;
    this.isOwner = commentsOwner === this.userService.currentUser.id;
  }

  delete() {
    this.deleteClicked.emit();
  }

  reply() {
    this.replyClicked.emit();
  }
}
