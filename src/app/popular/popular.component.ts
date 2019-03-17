import { Component, OnInit } from '@angular/core';
import { VideoService } from '../core/services/video.service';

@Component({
  selector: 'bs-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  constructor(private videoService: VideoService) { }
  isLoading: boolean = false;
  videos: any = [];

  ngOnInit() {
    this.loadPopularVideos();
  }

  loadPopularVideos() {
    this.isLoading = true;

    this.videoService.getVideos({}, 0, 40).subscribe(videos => {
      this.videos = videos;
    },
    (error) => {},
    () => {
      this.isLoading = false;
    });
  }
}
