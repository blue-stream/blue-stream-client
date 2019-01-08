import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/core/services/video.service';
import { Video } from 'src/app/shared/models/video.model';

@Component({
  selector: 'bs-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.scss']
})
export class ChannelVideosComponent implements OnInit {

  videos: Video[];

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.loadChannelVideos();
  }

  loadChannelVideos() {
    this.videoService.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

}
