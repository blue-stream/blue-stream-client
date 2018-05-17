import { Component, OnInit, Input } from '@angular/core';

import { Video } from '../models/video.model';

@Component({
  selector: 'bs-video-primary-info',
  templateUrl: './video-primary-info.component.html',
  styleUrls: ['./video-primary-info.component.scss']
})
export class VideoPrimaryInfoComponent implements OnInit {

  @Input() video: Video;

  constructor() { }

  ngOnInit() {
  }

  getLikesToDislikesRatio(): number {
    return (this.video.likes * 100) / (this.video.likes + this.video.dislikes);
  }
}
