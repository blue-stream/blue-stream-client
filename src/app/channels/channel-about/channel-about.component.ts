import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Channel } from '../../shared/models/channel.model';
import { ViewsService } from 'src/app/core/services/views.service';
import { VideoService } from 'src/app/core/services/video.service';

@Component({
  selector: 'bs-channel-about',
  templateUrl: './channel-about.component.html',
  styleUrls: ['./channel-about.component.scss']
})
export class ChannelAboutComponent implements OnChanges {
  @Input() channel: Channel;

  views: number;
  videosAmount: number;

  constructor(private viewsService: ViewsService, private videoService: VideoService) {}

  ngOnChanges() {
      this.loadChannelViews();
      this.loadVideosAmount();
  }

  loadChannelViews() {
    this.viewsService.getChannelViews(this.channel.id).subscribe(views => {
      this.views = views;
    });
  }

  loadVideosAmount() {
    this.videoService.getVideosAmount({channel: this.channel.id}).subscribe(amount => {
      this.videosAmount = amount;
    });
  }
}
