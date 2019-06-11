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
  @Input() isHistoryVideo: boolean = false;

  image: string;
  videoStatus = VideoStatus;
  channelName: string;
  videoPublishTime: string;
  lastWatchTime: string;
  timesWatched: number;

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    if (this.isHistoryVideo && !this.video.id) {
      this.translateService.get('SHARED.VIDEO_TILE.VIDEO_REMOVED').subscribe(translation => {
        this.video.title = `[${translation}]`;
      });
    }

    this.setImage(this.video.thumbnailPath);

    if (this.video && this.video.channel && (this.video.channel as Channel).name) {
      this.channelName = (this.video.channel as Channel).name;
    }

    if (this.isHistoryVideo) {
      this.lastWatchTime = this.getTimeAgo(this.video.lastViewDate);
      this.timesWatched = this.video.userWatchCount;
    } else {
      this.videoPublishTime = this.getTimeAgo(this.video.publishDate);
    }
  }

  private getTimeAgo(date: Date): string {
    return moment(date).locale(this.translateService.currentLang).fromNow();
  }

  mouseEnter() {
    this.setImage(this.video.previewPath);
  }

  mouseLeave() {
    this.setImage(this.video.thumbnailPath);
  }

  setImage(source: string) {
    if (!this.video.id) {
      this.image = '\\assets\\images\\no_thumbnail.jpg';
    } else if (this.video.status !== VideoStatus.READY || source.endsWith('undefined')) {
      this.image = null;
    } else {
      this.image = source;
    }
  }
}
