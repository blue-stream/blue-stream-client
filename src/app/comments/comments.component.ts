import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bs-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  commentsAmount: number = 125;

  constructor() { }

  ngOnInit() {
  }

}
