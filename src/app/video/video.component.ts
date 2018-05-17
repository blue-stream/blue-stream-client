import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Video } from './models/video.model';

@Component({
  selector: 'bs-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { }

  video: Video;
  routeIdSubscription: any;

  ngOnInit() {
    this.loadVideoInfo();
    // Subscribe to the id of the video in the route parameter
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.video.id = params.id;
    });
  }

  loadVideoInfo() {
    this.video = {
      id: '123456789',
      title: 'Test Video',
      description: 'test test test test test test test test test test test',
      views: 103,
      publishDate: '12/3/14',
      owner: 'Best Videos',
      likes: 123,
      dislikes: 34,
      catagory: 'Cool'
    };
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
  }

}
