import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss']
})
export class VideoThumbnailComponent implements OnInit {

  videoID: string = 'test-id'; // Change later to video class (containing video.id)

  constructor() { }

  ngOnInit() {
  }

}
