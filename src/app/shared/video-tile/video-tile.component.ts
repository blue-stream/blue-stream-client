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

  constructor() { }

  ngOnInit() {
    this.setImage(this.video.thumbnailPath);
  }

  mouseEnter() {
    this.setImage(this.video.previewPath);
  }

  mouseLeave() {
    this.setImage(this.video.thumbnailPath);
  }

  setImage(source: string) {
    if (this.video.status !== VideoStatus.READY || source.endsWith('undefined')) {
      this.image = null;
    } else {
      this.image = source;
    }
  }

}
