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
  viewSubscription: any;
  routeIdSubscription: any;
  recommendedVideosSubscription: any;
  recommendedVideos: Video[];
  isVideoWide: boolean = false;
  videoReady = VideoStatus.READY;
  isLoadingRecommended: boolean = false;

  ngOnInit() {
    this.routeIdSubscription = this.route.params.pipe(
      flatMap(params => {
        const id = params.id;
        return this.videoService.getVideo(id).map(video => this.video = video);
      })
    ).subscribe(() => {
      this.loadRecommendedVideos(this.video.id);
      if (this.video.published && this.video.status === this.videoReady) {
        this.increaseView();
      }
    });
  }

  loadRecommendedVideos(id: string) {
    this.isLoadingRecommended = true;

    this.recommendedVideosSubscription = this.videoService.getVideos({})
      .subscribe(videos => {
        this.recommendedVideos = videos.filter(video => video.id !== id);
        this.isLoadingRecommended = false;
      },
        (error) => {
          this.isLoadingRecommended = false;
        });
  }

  increaseView() {
    this.viewSubscription = this.viewService.increaseView(this.video.id).subscribe();
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
    this.viewSubscription.unsubscribe();
    this.recommendedVideosSubscription.unsubscribe();
  }

}
