import { Component, OnInit } from '@angular/core';
import { VideoService } from '../core/services/video.service';

@Component({
  selector: 'bs-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  constructor(private videoService: VideoService) { }
  popularVideos: any = [];

  ngOnInit() {
    this.loadPopularVideos();
  }

  loadPopularVideos() {
    this.popularVideos = this.videoService.getVideos();
  }
}
