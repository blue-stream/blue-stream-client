import { Component, OnInit, Input } from '@angular/core';
import { Video, VideoStatus } from '../models/video.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'bs-video-tile',
  templateUrl: './video-tile.component.html',
  styleUrls: ['./video-tile.component.scss']
})
export class VideoTileComponent implements OnInit {

  @Input() horizontal = false;
  @Input() description = false;
  @Input() video: Video;
  image: string;
  videoStatus = VideoStatus;

  constructor() {}

  ngOnInit() {
    this.image = this.video.thumbnailPath;
  }

  mouseEnter() {
    this.image = this.video.previewPath;
  }

  mouseLeave() {
    this.image = this.video.thumbnailPath;
  }

}
