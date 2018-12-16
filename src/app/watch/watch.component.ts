import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../core/services/video.service';
import { Video } from '../shared/models/video.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private videoService: VideoService) { }

  video: Observable<Video>;
  routeIdSubscription: any;
  recommendedVideos: Observable<Video[]>;
  isVideoWide: boolean = false;

  ngOnInit() {
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.loadRecommendedVideos(params.id);
      this.loadVideoInfo(params.id);
    });
  }

  loadRecommendedVideos(id: string) {
    this.recommendedVideos = this.videoService.getVideos();
  }

  loadVideoInfo(id: string) {
    this.video = this.videoService.getVideo(id);
    // this.video = {
    //   id: '123456789',
    //   title: 'Test Video',
    //   description: 'test test test test test test test test test test test',
    //   views: 103,
    //   publishDate: new Date(),
    //   owner: 'Best Videos',
    //   likes: 123,
    //   dislikes: 34,
    //   catagory: 'Cool',
    //   thumbnailPath: '',
    //   contentPath: 'http://localhost:3001/video/sample.mp4'
    // };
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
  }

}
