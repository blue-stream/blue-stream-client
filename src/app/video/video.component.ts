import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../shared/models/video.model';
import { VideoService } from '../core/services/video.service';


@Component({
  selector: 'bs-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

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
      thumbnailUrl: '',
    };
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
  }

}
