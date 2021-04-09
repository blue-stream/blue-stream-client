import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from 'src/app/shared/models/video.model';
import { VideoService } from '../core/services/video.service';
import { ComponentCanDeactivate } from '../core/can-deactivate/component-can-deactivate';

@Component({
  selector: 'bs-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.scss']
})
export class VideoEditComponent extends ComponentCanDeactivate implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService) {
      super();
  }

  video: Video;
  videoSaved: boolean = true;
  formChanged: boolean = false;
  routeIdSubscription: any;
  videoSubscription: any;

  ngOnInit() {
    this.routeIdSubscription = this.route.params.subscribe(params => {
      this.loadVideoInfo(params.id);
    });
  }

  loadVideoInfo(id: string) {
    this.videoSubscription = this.videoService.getVideo(id).subscribe(video => {
      this.video = video;
    });
  }

  ngOnDestroy() {
    this.routeIdSubscription.unsubscribe();
    this.videoSubscription.unsubscribe();
  }

  canDeactivate(): boolean {
    return this.videoSaved;
  }

  onVideoPublish() {
    this.videoSaved = true;
  }

  onVideoFormChange() {
    this.formChanged = true;
    this.videoSaved = false;
  }
}
