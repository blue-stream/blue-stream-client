import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Video, VideoStatus } from '../models/video.model';
import { Channel } from '../models/channel.model';
import { TranslateService } from '@ngx-translate/core';
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
  channelName: string;
  videoPublishTime: string;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.setImage(this.video.thumbnailPath);
    if (this.video && this.video.channel && (this.video.channel as Channel).name) {
      this.channelName = (this.video.channel as Channel).name;
    }
    this.videoPublishTime = moment(this.video.publishDate).locale(this.translateService.currentLang).fromNow();
  }

  mouseEnter() {
    this.image = this.video.previewPath;
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
