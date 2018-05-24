import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bs-comment-action-buttons',
  templateUrl: './comment-action-buttons.component.html',
  styleUrls: ['./comment-action-buttons.component.scss']
})
export class CommentActionButtonsComponent implements OnInit {

  @Input() likes: number;
  @Input() dislikes: number;

  constructor() { }

  ngOnInit() {
  }

}
