import { Component, OnChanges, Input } from '@angular/core';
import { VideoService } from 'src/app/core/services/video.service';
import { Video } from 'src/app/shared/models/video.model';
import { Channel } from '../../shared/models/channel.model';

@Component({
  selector: 'bs-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.scss']
})
export class ChannelVideosComponent implements OnChanges {
  @Input() videoFilter: Partial<Video>;
  videos: Video[];

  constructor(private videoService: VideoService) { }

  ngOnChanges() {
    this.loadChannelVideos();
  }

  loadChannelVideos() {
    this.videoService.getVideos(this.videoFilter).subscribe(videos => {
      this.videos = videos;
    });
  }

}
