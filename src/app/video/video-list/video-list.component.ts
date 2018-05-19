import { Component, OnInit, Input, ElementRef, ViewChild, DoCheck, HostListener } from '@angular/core';
import { Video } from '../shared/video.model';
import { VideoService } from '../shared/video.service';

@Component({
  selector: 'bs-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {

  // TODO : Add RTL support (use Directionality)

  readonly videoTileWidth = 210;
  readonly videoTileMargin = 2;
  startIndex = 0;
  @Input() horizontal = false;
  @Input() videos: Video[];

  constructor(public videoService: VideoService) { }

  scrollLeft() {
    this.startIndex = Math.max(this.startIndex - this.videoService.maxVideoColumnsAllowed, 0);
  }

  scrollRight() {
    if (this.startIndex + this.videoService.maxVideoColumnsAllowed < this.videos.length) {
      this.startIndex += this.videoService.maxVideoColumnsAllowed;
    }
  }
}
