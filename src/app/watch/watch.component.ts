import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../core/services/video.service';
import { Video, VideoStatus } from '../shared/models/video.model';
import { Observable } from 'rxjs/Observable';
import { ViewsService } from '../core/services/views.service';
import { flatMap, map } from 'rxjs/operators';

@Component({
  selector: 'bs-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private viewService: ViewsService,
  ) { }

  video: Video & { token: string };
  videoSubscription: any;
  routeIdSubscription: any;
  recommendedVideos: Video[];
  isVideoWide: boolean = false;
  videoReady = VideoStatus.READY;
  isLoadingRecommended: boolean = false;

  ngOnInit() {
    this.routeIdSubscription = this.route.params.pipe(
      flatMap(params => {
        const id = params.id;
        return this.viewService.increaseView(id).map(() => id);
      })
    ).subscribe((videoId: string) => {
      this.loadRecommendedVideos(videoId);
      this.loadVideoInfo(videoId);
    });
  }

  loadRecommendedVideos(id: string) {
    this.isLoadingRecommended = true;

    this.videoService.getVideos({})
    .subscribe(videos => {
      this.recommendedVideos = videos.filter( video => video.id !== id );
      this.isLoadingRecommended = false;
    },
    (error) => {
      this.isLoadingRecommended = false;
    });
  }

  loadVideoInfo(id: string) {
    this.videoSubscription = this.videoService.getVideo(id).subscribe(video => this.video = video);
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
    this.videoSubscription.unsubscribe();
  }

}
