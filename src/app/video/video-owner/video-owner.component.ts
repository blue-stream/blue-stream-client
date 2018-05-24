import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bs-video-owner',
  templateUrl: './video-owner.component.html',
  styleUrls: ['./video-owner.component.scss']
})
export class VideoOwnerComponent implements OnInit {

  @Input() owner: string;
  @Input() publishDate: string;

  constructor() { }

  ngOnInit() {
  }

}
