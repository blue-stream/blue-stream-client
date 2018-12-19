import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bs-comments-header',
  templateUrl: './comments-header.component.html',
  styleUrls: ['./comments-header.component.scss']
})
export class CommentsHeaderComponent implements OnInit {
  @Input() commentsAmount: number;
  @Input() resource: string;
  constructor() { }

  ngOnInit() {
  }
}
