import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../core/services/video.service';
import { Video } from '../shared/models/video.model';

@Component({
  selector: 'bs-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private videoService: VideoService) { }

  video: Video;
  routeIdSubscription: any;
  recommendedVideos: any = [];

  ngOnInit() {
    this.loadVideoInfo();
    this.loadRecommendedVideos();
    // Subscribe to the id of the video in the route parameter
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.video.id = params.id;
    });
  }

  loadRecommendedVideos() {
    this.recommendedVideos = this.videoService.getVideos();
  }

  loadVideoInfo() {
    this.video = {
      id: '123456789',
      title: 'Test Video',
      description: 'test test test test test test test test test test test',
      views: 103,
      publishDate: new Date(),
      owner: 'Best Videos',
      likes: 123,
      dislikes: 34,
      catagory: 'Cool',
      thumbnailUrl: ''
    };
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
  }

}
