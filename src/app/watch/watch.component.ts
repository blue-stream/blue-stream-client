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

  video: Video;
  videoSubscription: any;
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
    this.videoSubscription = this.videoService.getVideo(id).subscribe(video => this.video = video);
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
    this.videoSubscription.unsubscribe();
  }

}
