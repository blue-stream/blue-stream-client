import { Component, OnInit } from '@angular/core';
import { VideoService } from '../core/services/video.service';

@Component({
  selector: 'bs-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  constructor(private videoService: VideoService) { }
  videos: any = [];

  ngOnInit() {
    this.loadPopularVideos();
  }

  loadPopularVideos() {
    this.videos = this.videoService.getVideos();
  }
}
