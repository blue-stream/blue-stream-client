import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { VideoService } from 'src/app/core/services/video.service';
import { Video } from 'src/app/shared/models/video.model';

@Component({
  selector: 'bs-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.scss']
})
export class ChannelVideosComponent implements OnInit, OnChanges {
  @Input() videoFilter: Partial<Video>;
  videos: Video[] = [];
  isLoading: boolean = false;
  videosAmountToLoad: number = 20;

  constructor(private videoService: VideoService) { }

  ngOnChanges() {
    this.videos = [];
    this.loadNextVideos();
  }

  ngOnInit() {
    this.videos = [];
    this.loadNextVideos();
  }

  onScroll() {
    this.loadNextVideos();
  }

  loadNextVideos() {
    this.loadChannelVideos(
      this.videos.length,
      this.videosAmountToLoad);
  }

  loadChannelVideos(startIndex: number, videosToLoad: number) {
    const endIndex: number = startIndex + videosToLoad;

    this.isLoading = true;

    this.videoService.getVideos(this.videoFilter, startIndex, endIndex).subscribe(videos => {
      this.isLoading = false;

      if (startIndex === 0) {
        this.videos = videos;
      } else {
        this.videos = this.videos.concat(videos);
      }
    },
      (error) => {
        this.isLoading = false;
      });
  }
}
