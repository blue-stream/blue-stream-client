import { Component, OnInit, Input } from '@angular/core';
import { VideoService } from 'src/app/core/services/video.service';
import { Video } from 'src/app/shared/models/video.model';
import { Channel } from '../../shared/models/channel.model';

@Component({
  selector: 'bs-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.scss']
})
export class ChannelVideosComponent implements OnInit {
  @Input() channelFilter: Channel;
  videos: Video[];

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.loadChannelVideos();
  }

  loadChannelVideos() {
    this.videoService.getVideos(this.channelFilter).subscribe(videos => {
      this.videos = videos;
    });
  }

}
